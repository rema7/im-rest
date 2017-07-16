"""
Add contact table
"""

from yoyo import step

__depends__ = {'20170627_01_cbc6C-session-table'}

CREATE_TABLE = '''
CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    user_id bigint not null,
    contact_id bigint not null
);
'''

DROP_TABLE = '''
DROP TABLE IF EXISTS contact;
'''

steps = [
    step(CREATE_TABLE, DROP_TABLE)
]

