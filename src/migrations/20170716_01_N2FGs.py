"""
Add contact table
"""

from yoyo import step

__depends__ = {'20170622_01_3flQw'}

CREATE_TABLE = '''
CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    owner_id bigint not null,
    email varchar not null,
    first_name varchar not null,
    last_name varchar not null,
    contact_id bigint
);
create unique index contact_owner_id_email_uindex
on contact (owner_id, email);
'''

DROP_TABLE = '''
DROP TABLE contact;
DROP INDEX contact_owner_id_email_uindex;
'''

steps = [
    step(CREATE_TABLE, DROP_TABLE)
]
