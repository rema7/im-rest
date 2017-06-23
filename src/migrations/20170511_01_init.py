"""

"""

from yoyo import step

__depends__ = {}

CREATE_TABLE = '''
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    email varchar not null,
    created_at timestamp not null,
    updated_at timestamp not null
);
CREATE TABLE IF NOT EXISTS auth_code (
    token varchar not null PRIMARY KEY,
    user_id bigint not null,
    code INTEGER not null,
    valid_to timestamp not null
);
'''

DROP_TABLE = '''
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS auth_code;
'''

steps = [
    step(CREATE_TABLE, DROP_TABLE)
]
