import uuid

from validate_email import validate_email
from helpers import date
from webargs import fields
from webargs.falconparser import use_args

import settings as app_settings
from db.session import open_db_session
from db.models import (
    AuthCode,
    User,
    UserToken,
    Session,
)
from api.logic import (
    generate_auth_code,
    generate_token,
    generate_session_id,
)
from api.helpers import (
    validate_schema,
    raise_400,
)

code_post = open("api/schemas/code-post.json").read()
auth_post = open("api/schemas/auth-post.json").read()
email_post = open("api/schemas/login-post.json").read()


class LoginResource:
    @staticmethod
    def vaildate_auth_code(date):
        return date.is_valid(date)

    @staticmethod
    def post_body(email):
        if validate_email(email) is not True:
            raise_400("Invalid email {}".format(email))

        with open_db_session() as session:
            user = session.query(User).filter(User.email == email).first()
            if user is None:
                user = User(
                    email=email
                )
                session.add(user)
                session.flush()

            code = session.query(AuthCode).filter(
                AuthCode.user_id == user.id).first()
            if code is None:
                valid_to = date.valid_to(app_settings.AUTH_CODE_VALID_DURATION)
                code = AuthCode(
                    token=uuid.uuid4().hex,
                    user_id=user.id,
                    code=generate_auth_code(),
                    valid_to=valid_to
                )
                session.add(code)
                session.flush()

            result = {
                'code': code.code,
                'auth_key': code.token
            }
            session.commit()
        return result

    def on_post(self, req, resp):
        body = req.context['body']
        validate_schema(body, email_post)

        resp.body = self.post_body(
            email=body['email']
        )


class AuthResource:
    @staticmethod
    def post_body(auth_key, code):
        with open_db_session() as session:
            auth_code = session.query(AuthCode).filter(
                AuthCode.token == auth_key, AuthCode.code == code)
            row = auth_code.first()
            if row is None:
                raise_400("Invalid code")
            token = generate_token()
            user_token = UserToken(
                user_id=row.user_id,
                token=token,
            )
            new_session = generate_session_id()
            user_session = Session(
                user_id=row.user_id,
                session=new_session,
                valid_to=date.valid_to(app_settings.SESSION_DURATION)
            )
            auth_code.delete()
            session.add(user_token)
            session.add(user_session)
            session.commit()
        return {
            'token': token,
            'session': new_session,
        }

    def on_post(self, req, resp):
        body = req.context['body']
        validate_schema(body, code_post)

        resp.body = self.post_body(
            auth_key=body['auth_key'],
            code=body['code']
        )


class SessionResource:
    @staticmethod
    def post_body(token):
        with open_db_session() as session:
            token = session.query(UserToken).filter(UserToken.token == token).first()
            if not token:
                raise_400('Invalid token')

            new_session = generate_session_id()
            user_session = Session(
                user_id=token.user_id,
                session=new_session,
                valid_to=date.valid_to(app_settings.SESSION_DURATION)
            )
            session.add(user_session)
            session.commit()
            return {
                'session': new_session,
            }

    def on_post(self, req, resp):
        body = req.context['body']
        validate_schema(body, auth_post)

        resp.body = self.post_body(
            token=body['token'],
        )


class SettingsResource:
    def on_get(self, req, resp):
        business_logic_keys = (
            'offset',
        )
        resp.body = {key: getattr(app_settings, key.upper())
                     for key in business_logic_keys}

class SearchResource:
    @staticmethod
    def get_body(search_string):
        with open_db_session() as session:
            search = '%{}%'.format(search_string)
            result = session.query(User).filter(
                User.email.like(search)
            ).all()
        return [u.as_dict() for u in result]

    @use_args({
        's': fields.Str(required=True),
    })
    def on_get(self, req, resp, args):
        result = self.get_body(args['s'])
        resp.body = {
            'result': result,
        }
