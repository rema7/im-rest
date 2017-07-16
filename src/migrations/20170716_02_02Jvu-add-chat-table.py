"""
Add chat table
"""

from yoyo import step

__depends__ = {'20170716_01_N2FGs-add-contact-table'}

CREATE_TABLE = '''
CREATE TABLE IF NOT EXISTS chat (
    id SERIAL PRIMARY KEY,
    owner_id bigint not null,
    title varchar not null
);
CREATE TABLE IF NOT EXISTS chat_member (
    id SERIAL PRIMARY KEY,
    chat_id bigint not null,
    user_id bigint not null
);
'''

DROP_TABLE = '''
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS chat_member;
'''


steps = [
    step(CREATE_TABLE, DROP_TABLE)
]
