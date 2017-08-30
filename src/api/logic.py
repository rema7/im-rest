from random import randint
from uuid import uuid4
import logging

from cache.cache import set_to_cache, get_from_cache
from decorators import with_db_session
from db.models import AccountToken
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
    account_id = get_from_cache(token)
    if account_id is None:
        account_token = db_session.query(AccountToken).filter(AccountToken.token == token).first()
        if account_token is None:
            raise_401()
        set_to_cache(account_token.token, account_token.account_id)
        req.context['uid'] = account_token.account_id
    else:
        req.context['uid'] = account_id
