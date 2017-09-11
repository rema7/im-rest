"""

"""

from yoyo import step

__depends__ = {}

CREATE_TABLE = '''
CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    email varchar not null,
    profile_id bigint,
    created_at timestamp not null,
    updated_at timestamp not null
);
CREATE TABLE account_profile (
    id SERIAL PRIMARY KEY,
    first_name varchar not null,
    last_name varchar not null,
    created_at timestamp not null,
    updated_at timestamp not null
);
CREATE TABLE auth_code (
    token varchar not null PRIMARY KEY,
    account_id bigint not null,
    code varchar not null,
    valid_to timestamp not null
);
'''

DROP_TABLE = '''
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS account_profile;
DROP TABLE IF EXISTS auth_code;
'''

steps = [
    step(CREATE_TABLE, DROP_TABLE)
]
