from logging.config import dictConfig

import falcon

from api.serializer import error_serializer
from api.resources import (
    AuthResource,
    ChatResource,
    ContactsResource,
    LoginResource,
    SearchResource,
    SettingsResource,
    AccountProfileResource,
)
from middlewares import (
    ContentEncodingMiddleware,
    SecureMiddleware,
)

import settings as app_settings

dictConfig(app_settings.LOGGING)

app = falcon.API(middleware=[
    SecureMiddleware(),
    ContentEncodingMiddleware(),
])

app.add_route('/login', LoginResource())
app.add_route('/auth/code', AuthResource())
app.add_route('/account', AccountProfileResource())
app.add_route('/contacts', ContactsResource())
app.add_route('/chats', ChatResource())
app.add_route('/search', SearchResource())
app.add_route('/settings', SettingsResource())
app.set_error_serializer(error_serializer)
