import logging
from invoke import task

from cache.cache import flushdb as flush_cache
from db.session import open_db_session
from db.models import (
    User,
    Contact,
    Session,
)

logger = logging.getLogger('im-rest.' + __name__)


def clean_test_data(db_session):
    users_query = db_session.query(User.id).filter(User.email.like('%@im.im%'))
    user_ids = users_query.all()
    db_session.query(Contact).filter(Contact.user_id.in_(
        user_ids)).delete(synchronize_session='fetch')
    db_session.query(Session).filter(Session.user_id.in_(
        user_ids)).delete(synchronize_session='fetch')
    users_query.delete(synchronize_session='fetch')


@task(help={
    'account_number': 'Number of generated account'
})
def generate_data(ctx, account_number=10):
    """
    Fill data in DataBase
    """
    print('Start filling...')
    email_template = 'test_im{index}@im.im'
    users = []
    with open_db_session() as db_session:
        clean_test_data(db_session)
        for i in range(1, account_number):
            print(email_template.format(index=i))
            user = User(
                email=email_template.format(index=i),
            )
            db_session.add(user)
            users.append(user)

        db_session.flush()
        user = users[0]
        db_session.add(Session(
            user_id=user.id,
            session='test_session',
        ))
        for u in users[1:]:
            contact = Contact(
                user_id=user.id,
                contact_id=u.id,
            )
            db_session.add(contact)

        db_session.commit()
    flush_cache()
    print('Success')
