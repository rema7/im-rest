from random import randint
from uuid import uuid4
import base64
import os
import logging

from cache.cache import set_to_cache, get_from_cache
from decorators import with_db_session
from db.models import UserToken
from api.helpers import raise_401

logger = logging.getLogger('im-rest.' + __name__)


def generate_auth_code(code_length=4):
    code = [str(randint(0, 9)) for _ in range(code_length)]
    return ''.join(code)


def generate_token():
    return uuid4().hex


@with_db_session
def validate_auth(req, resp, resource, params, db_session=None):
    token = req.context['Token']
    if not token:
        raise_401()
    user_id = get_from_cache(token)
    if user_id is None:
        userToken = db_session.query(UserToken).filter(UserToken.token == token).first()
        if userToken is None:
            raise_401()
        set_to_cache(userToken.token, userToken.user_id)
        req.context['uid'] = userToken.user_id
    else:
        req.context['uid'] = user_id
