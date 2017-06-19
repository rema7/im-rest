from random import randint
import jwt 

import settings as app_settings


def generate_auth_code(code_length=4):
    code = [str(randint(0, 9)) for _ in range(code_length)]
    return ''.join(code)

def encode_jwt(payload):
    return jwt.encode(payload, app_settings.JWT_SECRET_KEY, algorithm=app_settings.JWT_ALGORITHM)

def decode_jwt(token):
    return jwt.decode(token, app_settings.JWT_SECRET_KEY, algorithm=app_settings.JWT_ALGORITHM)
