from random import randint
from uuid import uuid4
import base64
import os


def generate_auth_code(code_length=4):
    code = [str(randint(0, 9)) for _ in range(code_length)]
    return int(''.join(code))


def generate_token():
    return uuid4().hex


def generate_session_id(num_bytes=16):
    return base64.b64encode(os.urandom(16))
