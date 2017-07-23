"""

"""

from yoyo import step

__depends__ = {}

CREATE_TABLE = '''
CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    email varchar not null,
    first_name varchar not null,
    last_name varchar not null,
    created_at timestamp not null,
    updated_at timestamp not null
);
CREATE TABLE IF NOT EXISTS auth_code (
    token varchar not null PRIMARY KEY,
    user_id bigint not null,
    code varchar not null,
    valid_to timestamp not null
);
'''

DROP_TABLE = '''
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS auth_code;
'''

steps = [
    step(CREATE_TABLE, DROP_TABLE)
]
