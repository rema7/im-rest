import logging

from faker import Factory

from db.session import open_db_session
from db.models import (
    Contact,
    Chat,
    ChatMember,
    Account,
    AccountProfile,
    AccountToken,
)

logger = logging.getLogger('im-rest.' + __name__)


def clear_test_data():
    with open_db_session() as db_session:
        clear_data(db_session)

        db_session.commit()


def clear_data(db_session):
    users_query = db_session.query(Account.id).filter(Account.email.like('%@im.im%'))

    account_ids = users_query.all()
    db_session.query(Contact).filter(Contact.owner_id.in_(account_ids)).delete(synchronize_session='fetch')

    members_query = db_session.query(ChatMember.chat_id)
    chat_ids = members_query.all()
    db_session.query(Chat).filter(Chat.id.in_(chat_ids)).delete(synchronize_session='fetch')

    members_query.filter(ChatMember.account_id.in_(account_ids)).delete(synchronize_session='fetch')

    users_query.delete(synchronize_session='fetch')


def generate_contacts(db_session, user, interlocutors):
    db_session.add(AccountToken(
        account_id=user['id'],
        token='fake_token',
    ))
    for interlocutor in interlocutors:
        contact = Contact(
            owner_id=user['id'],
            email=interlocutor['email'],
            first_name=interlocutor['first_name'],
            last_name=interlocutor['last_name'],
            contact_id=interlocutor['id'],
        )
        db_session.add(contact)
        contact = Contact(
            owner_id=interlocutor['id'],
            email=user['email'],
            first_name=user['first_name'],
            last_name=user['last_name'],
            contact_id=user['id'],
        )
        db_session.add(contact)


def generate_chats(db_session, user, users):
    for chatUser in users:
        chat = Chat()
        db_session.add(chat)
        db_session.flush()
        chatMember = ChatMember(
            chat_id=chat.id,
            account_id=user['id'],
        )
        db_session.add(chatMember)
        chatMember = ChatMember(
            chat_id=chat.id,
            account_id=chatUser['id'],
        )
        db_session.add(chatMember)


def generate_test_data(account_number, chat_numbers, email_template='test_im{index}@im.im'):
    fake = Factory.create('ru_RU')

    users = []
    with open_db_session() as db_session:
        clear_data(db_session)
        for i in range(1, account_number):
            print(email_template.format(index=i))
            name = fake.name().split()
            profile = AccountProfile(
                first_name=name[0],
                last_name=name[1],
            )
            db_session.add(profile)
            db_session.flush()
            user = Account(
                email=email_template.format(index=i),
                profile_id=profile.id,
            )
            db_session.add(user)
            users.append((user, profile))

        db_session.flush()

        accounts = []
        for (user, profile) in users:
            accounts.append({
                'id': user.id,
                'email': user.email,
                'first_name': profile.first_name,
                'last_name': profile.last_name,
            })

        user = accounts[0]

        generate_contacts(db_session, user, accounts[1:])

        chat_numbers = account_number if chat_numbers > account_number else chat_numbers+1
        generate_chats(db_session, user, accounts[1:chat_numbers])

        db_session.commit()
