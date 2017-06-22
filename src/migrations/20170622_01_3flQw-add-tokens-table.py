"""
Add user_token table
"""

from yoyo import step

__depends__ = {'20170511_01_init'}

CREATE_TABLE = '''
CREATE TABLE IF NOT EXISTS user_token (
    jwt varchar not null,
    user_id bigint not null
);
'''

DROP_TABLE = '''
DROP TABLE IF EXISTS user_token;
'''

steps = [
    step(CREATE_TABLE, DROP_TABLE)
]
