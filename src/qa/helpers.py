import logging

from db.session import open_db_session
from db.models import (
    User,
    Contact,
    Session,
    Chat,
    ChatMember,
)

logger = logging.getLogger('im-rest.' + __name__)


def clear_test_data():
    with open_db_session() as db_session:
        clear_data(db_session)

        db_session.commit()


def clear_data(db_session):
    users_query = db_session.query(User.id).filter(User.email.like('%@im.im%'))

    user_ids = users_query.all()
    db_session.query(Contact).filter(Contact.owner_id.in_(user_ids)).delete(synchronize_session='fetch')
    db_session.query(Session).filter(Session.user_id.in_(user_ids)).delete(synchronize_session='fetch')

    members_query = db_session.query(ChatMember.chat_id)
    chat_ids = members_query.all()
    db_session.query(Chat).filter(Chat.id.in_(chat_ids)).delete(synchronize_session='fetch')

    members_query.filter(ChatMember.user_id.in_(user_ids)).delete(synchronize_session='fetch')

    users_query.delete(synchronize_session='fetch')


def generate_contacts(db_session, user, interlocutors):
    db_session.add(Session(
        user_id=user.id,
        session='fake_session',
    ))
    for interlocutor in interlocutors:
        contact = Contact(
            owner_id=user.id,
            email=interlocutor.email,
            first_name=interlocutor.first_name,
            last_name=interlocutor.last_name,
            contact_id=interlocutor.id,
        )
        db_session.add(contact)
        contact = Contact(
            owner_id=interlocutor.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            contact_id=user.id,
        )
        db_session.add(contact)


def generate_chats(db_session, user, users):
    for chatUser in users:
        chat = Chat()
        db_session.add(chat)
        db_session.flush()
        chatMember = ChatMember(
            chat_id=chat.id,
            user_id=user.id,
        )
        db_session.add(chatMember)
        chatMember = ChatMember(
            chat_id=chat.id,
            user_id=chatUser.id,
        )
        db_session.add(chatMember)


def generate_test_data(account_number, chat_numbers, email_template='test_im{index}@im.im'):
    users = []
    with open_db_session() as db_session:
        clear_data(db_session)
        for i in range(1, account_number):
            print(email_template.format(index=i))
            user = User(
                email=email_template.format(index=i),
                first_name='FirstName_{}'.format(i),
                last_name='LastName_{}'.format(i),
            )
            db_session.add(user)
            users.append(user)

        db_session.flush()

        user = users[0]

        generate_contacts(db_session, user, users[1:])

        chat_numbers = account_number if chat_numbers > account_number else chat_numbers+1
        generate_chats(db_session, user, users[1:chat_numbers])


        db_session.commit()
