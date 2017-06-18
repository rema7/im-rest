
from random import randint

def generate_auth_code(code_length=4):
    code = [str(randint(0, 9)) for _ in range(code_length)]
    return ''.join(code)
