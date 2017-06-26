import datetime
import uuid

from validate_email import validate_email

import settings as app_settings
from db.session import open_db_session
from db.models import (
    AuthCode,
    User,
    UserToken,
)
from api.logic import generate_auth_code, generate_token
from api.helpers import (
    validate_schema,
    raise_400,
)

auth_post = open("api/schemas/auth-post.json").read()
email_post = open("api/schemas/login-post.json").read()


class LoginResource:
    def vaildate_auth_code(self, date):
        return datetime.datetime.utcnow() < date

    def post_body(self, email):
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

            code = session.query(AuthCode).filter(AuthCode.user_id == user.id).first()
            if code is None:
                valid_to = datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
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
    def post_body(self, auth_key, code):
        with open_db_session() as session:
            authCode = session.query(AuthCode).filter(AuthCode.token == auth_key, AuthCode.code == code).first()
            if authCode is None:
                raise_400("Invalid code")

            token = generate_token()
            userToken = UserToken(
                user_id=authCode.user_id,
                token=token,
            )

            session.add(userToken)
            session.commit()
            print(token)
        return {
            'token': generate_token(),
        }

    def on_post(self, req, resp):
        body = req.context['body']
        validate_schema(body, auth_post)

        resp.body = self.post_body(
            auth_key=body['auth_key'],
            code=body['code']
        )


class SettingsResource:
    def on_get(self, req, resp):
        business_logic_keys = (
            'offset',
        )
        resp.body = {key: getattr(app_settings, key.upper())
                     for key in business_logic_keys}
