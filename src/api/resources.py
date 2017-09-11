import uuid
import logging

import falcon

from validate_email import validate_email
from helpers import date
from webargs import fields
from webargs.falconparser import use_args

from api.logic import (
    generate_auth_code,
    generate_token,
    validate_auth,
)
from api.helpers import (
    validate_schema,
    raise_400,
)
from cache.cache import set_to_cache
from decorators import with_db_session
from db.session import open_db_session
from db.models import (
    AuthCode,
    Account,
    AccountToken,
    Contact,
    ChatMember,
)
import settings as app_settings

logger = logging.getLogger('im-rest.' + __name__)

code_post = open("api/schemas/code-post.json").read()
auth_post = open("api/schemas/auth-post.json").read()
email_post = open("api/schemas/login-post.json").read()


class LoginResource:
    @staticmethod
    def vaildate_auth_code(date):
        return date.is_valid(date)

    @staticmethod
    @with_db_session
    def post_body(email, db_session=None):
        if validate_email(email) is not True:
            raise_400("Invalid email {}".format(email))

        user = db_session.query(Account).filter(Account.email == email).first()
        if user is None:
            user = Account(
                email=email
            )
            db_session.add(user)
            db_session.flush()

        code = db_session.query(AuthCode).filter(AuthCode.account_id == user.id).first()
        if code is None:
            valid_to = date.valid_to(app_settings.AUTH_CODE_VALID_DURATION)
            code = AuthCode(
                token=uuid.uuid4().hex,
                account_id=user.id,
                code=generate_auth_code(),
                valid_to=valid_to
            )
            db_session.add(code)
            db_session.flush()

        result = {
            'code': code.code,
            'key': code.token
        }
        db_session.commit()
        return result

    def on_post(self, req, resp):
        body = req.context['body']
        validate_schema(body, email_post)

        resp.body = self.post_body(
            email=body['email']
        )


class AuthResource:
    @staticmethod
    @with_db_session
    def post_body(key, code, db_session=None):
        auth_code = db_session.query(AuthCode).filter(
            AuthCode.token == key, AuthCode.code == code)
        row = auth_code.first()
        if row is None:
            raise_400("Invalid code")
        token = generate_token()
        user_token = AccountToken(
            account_id=row.account_id,
            token=token,
        )
        auth_code.delete()
        db_session.add(user_token)
        db_session.commit()
        set_to_cache(token, row.account_id)
        return {
            'token': token,
        }

    def on_post(self, req, resp):
        body = req.context['body']
        validate_schema(body, code_post)

        resp.body = self.post_body(
            key=body['key'],
            code=body['code']
        )


class SettingsResource:
    def on_get(self, req, resp):
        business_logic_keys = (
            'offset',
        )
        resp.body = {key: getattr(app_settings, key.upper())
                     for key in business_logic_keys}


@falcon.before(validate_auth)
class AccountProfileResource:
    @staticmethod
    @with_db_session
    def get_body(uid, db_session=None):
        account = db_session.query(Account).filter(Account.id == uid).first()
        return account

    def on_get(self, req, resp):
        account = self.get_body(req.context['uid'])
        resp.body = {
            'result': account.as_dict(),
        }


@falcon.before(validate_auth)
class SearchResource:
    @staticmethod
    def get_body(search_string):
        with open_db_session() as session:
            search = '%{}%'.format(search_string)
            result = session.query(Account).filter(Account.email.like(search)).all()
        return [u.as_dict() for u in result]

    @use_args({
        's': fields.Str(required=True),
    })
    def on_get(self, req, resp, args):
        result = self.get_body(args['s'])
        resp.body = {
            'result': result,
        }


@falcon.before(validate_auth)
class ContactsResource:
    @staticmethod
    @with_db_session
    def get_body(uid, db_session=None):
        contacts = db_session.query(Contact).filter(
            Contact.account_id == uid).all()
        return [c.as_dict() for c in contacts]

    def on_get(self, req, resp):
        result = self.get_body(req.context['uid'])
        resp.body = {
            'result': result,
        }


@falcon.before(validate_auth)
class ChatResource:
    def get_chats(self, db_session, uid):
        chat_ids = db_session.query(ChatMember.chat_id).filter(
            ChatMember.account_id == uid).all()

        chats = []
        for chat_id in [r for r, in chat_ids]:
            member_ids = db_session.query(ChatMember.account_id).filter(
                ChatMember.chat_id == chat_id, ChatMember.account_id != uid
            ).all()
            users = db_session.query(Account).filter(Account.id.in_(member_ids)).all()
            chats.append({
                'chat_id': chat_id,
                'messages': [],
                'members': [{
                    'id': u.id,
                    'first_name': u.profile.first_name,
                    'last_name': u.profile.last_name,
                } for u in users],
            })
        return chats

    def get_contacts(self, db_session, uid):
        contacts = db_session.query(Contact).filter(
            Contact.owner_id == uid).all()
        return [c.as_dict() for c in contacts]

    @with_db_session
    def get_body(self, uid, db_session=None):
        chats = self.get_chats(db_session, uid)
        # contacts = self.get_contacts(db_session, uid)
        return {
            'chats': chats,
        }

    def on_get(self, req, resp):
        result = self.get_body(req.context['uid'])
        resp.body = result
