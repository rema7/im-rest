from random import randint
from uuid import uuid4
import base64
import os
import logging

from cache.cache import set_to_cache, get_from_cache
from decorators import with_db_session
from db.models import Session
from api.helpers import raise_401

logger = logging.getLogger('im-rest.' + __name__)


def generate_auth_code(code_length=4):
    code = [str(randint(0, 9)) for _ in range(code_length)]
    return int(''.join(code))


def generate_token():
    return uuid4().hex


def generate_session_id(num_bytes=16):
    return base64.b64encode(os.urandom(16)).decode('utf-8')


@with_db_session
def validate_auth(req, resp, resource, params, db_session=None):
    token = req.context['Token']
    if not token:
        raise_401('Not authorized')
    user_id = get_from_cache(token)
    if user_id is None:
        session = db_session.query(Session).filter(Session.session == token).first()
        if session is None:
            raise_401('Not authorized')
        set_to_cache(session.session, session.user_id)
        req.context['uid'] = session.user_id
    else:
        req.context['uid'] = user_id
