from json import loads

import falcon
from jsonschema import validate, exceptions

BAD_REQUEST = 'BAD_REQUEST'
NOT_FOUND = 'NOT_FOUND'

def raise_http_error(status, title, description):
    raise falcon.HTTPError(
        status=status,
        title=title,
        description=description
    )


def raise_401(title='Not authorized', description=None):
    raise falcon.HTTPUnauthorized(
        title=title,
        description=description
    )


def raise_400(message):
    raise_http_error(status=falcon.HTTP_400, title=BAD_REQUEST, description=message)


def raise_404(message):
    raise_http_error(status=falcon.HTTP_404, title=NOT_FOUND, description=message)


def validate_schema(body, schema):
    try:
        validate(body, loads(schema))
    except exceptions.ValidationError as ex:
        raise_400(ex.message)
