"""
Add chat table
"""

from yoyo import step

__depends__ = {'20170716_01_N2FGs'}

CREATE_TABLE = '''
CREATE TABLE chat (
    id SERIAL PRIMARY KEY
);
CREATE TABLE chat_member (
    id SERIAL PRIMARY KEY,
    chat_id bigint not null,
    account_id bigint not null
);
'''

DROP_TABLE = '''
DROP TABLE chat;
DROP TABLE chat_member;
'''


steps = [
    step(CREATE_TABLE, DROP_TABLE)
]
