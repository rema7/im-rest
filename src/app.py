from logging.config import dictConfig

import falcon

from api.serializer import error_serializer
from api.resources import (
    SettingsResource,
    AuthResource,
    LoginResource
)
from middlewares import ContentEncodingMiddleware
import settings as app_settings

dictConfig(app_settings.LOGGING)

app = falcon.API(middleware=[
    ContentEncodingMiddleware(),
])

app.add_route('/login', LoginResource())
app.add_route('/auth', AuthResource())
app.add_route('/settings', SettingsResource())
app.set_error_serializer(error_serializer)
