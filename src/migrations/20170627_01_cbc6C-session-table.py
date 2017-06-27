"""
Session table
"""

from yoyo import step

__depends__ = {'20170622_01_3flQw-add-tokens-table'}

CREATE_TABLE = '''
CREATE TABLE IF NOT EXISTS session (
    user_id bigint not null,
    session varchar not null,
    valid_to timestamp not null
);
'''

DROP_TABLE = '''
DROP TABLE IF EXISTS session;
'''

steps = [
    step(CREATE_TABLE, DROP_TABLE)
]

