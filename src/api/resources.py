import datetime
import uuid

import settings as app_settings
from db.session import open_db_session
from db.models import (
    AuthCode,
    User
)
from api.logic import generate_auth_code, encode_jwt
from api.helpers import (
    validate_schema,
    raise_400
)

auth_post = open("api/schemas/auth-post.json").read()
email_post = open("api/schemas/login-post.json").read()


class LoginResource:
    def vaildate_auth_code(self, date):
        return datetime.datetime.utcnow() < date

    def post_body(self, email):
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
                'token': code.token
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
    def post_body(self, token, code):
        with open_db_session() as session:
            row = session.query(AuthCode).filter(AuthCode.token == token, AuthCode.code == code).first()
            if row is None:
                raise_400("Invalid code")

        return {
            'result': encode_jwt({
                'uid': row.user_id
            })
        }

    def on_post(self, req, resp):
        body = req.context['body']
        validate_schema(body, auth_post)

        resp.body = self.post_body(
            token=body['token'],
            code=body['code']
        )


class SettingsResource:
    def on_get(self, req, resp):
        business_logic_keys = (
            'offset',
        )
        resp.body = {key: getattr(app_settings, key.upper())
                     for key in business_logic_keys}


# class ToDoResource(object):
#     def on_get(self, req, resp, todo_id=None):
#         with open_db_session() as session:
#             todos = session.query(ToDo)
#             if todo_id is not None:
#                 todo = todos.filter(ToDo._id == todo_id).first()
#                 if todo is None:
#                     raise_404("ToDo reccord with id={} not found".format(todo_id))
#                 result = todo.as_dict()
#             else:
#                 result = []
#                 for todo in todos.all():
#                     result.append(todo.as_dict())
#         resp.body = {
#             'result': result
#         }
#
#     def post_body(self, title, description, todo_id=None):
#         with open_db_session() as session:
#             todo = session.query(ToDo).filter(ToDo._id == todo_id).first()
#             if todo_id is not None and todo is None:
#                 raise_404("ToDo with id={} not found".format(todo_id))
#             if todo is not None:
#                 todo.update(title, description)
#             else:
#                 new_todo = ToDo(title=title, description=description)
#                 session.add(new_todo)
#                 session.flush()
#                 todo = deepcopy(new_todo)
#                 session.commit()
#         return {
#             'result': todo.as_dict()
#         }
#
#     def on_post(self, req, resp, todo_id=None):
#         body = req.context['body']
#         validate_schema(body, todo_post)
#
#         resp.body = self.post_body(
#             todo_id=body['id'] if 'id' in body else None,
#             title=body['title'],
#             description=body['description'],
#         )
#
#     def on_delete(self, req, resp, todo_id):
#         if todo_id is not None:
#             with open_db_session() as session:
#                 todo = session.query(ToDo).filter(
#                     ToDo._id == todo_id).first()
#                 if todo is not None:
#                     session.delete(todo)
#                     session.commit()
#                 else:
#                     raise_404("ToDo with id={} not found".format(todo_id))
#         resp.body = {
#             'result': todo_id
#         }
