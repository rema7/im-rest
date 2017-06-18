import json

from middlewares import JSONEncoder


def error_serializer(req, resp, exception):
    preferred = req.client_prefers(('application/json',))
    if preferred is not None:
        if preferred == 'application/json':
            resp.body = json.dumps(exception.to_dict(), cls=JSONEncoder)
        resp.content_type = preferred
