from datetime import datetime

from sqlalchemy import (
    Column,
    BigInteger,
    String,
    TIMESTAMP,
    JSON,
    Integer,
    ForeignKey,
)
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class BaseInfo:
    __table__ = None

    def __init__(self, **kwargs):
        for column in self.__table__.columns.items():
            column_name = column[0]
            if column_name not in kwargs:
                default = getattr(self.__table__.c, column_name).default
                if default:
                    kwargs[column_name] = default.arg if not hasattr(default.arg, '__call__') else None

        super(BaseInfo, self).__init__(**kwargs)

    id = Column("id", BigInteger, primary_key=True, autoincrement=True)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)


class User(BaseInfo, Base):
    __tablename__ = 'user'

    email = Column(String, nullable=False, primary_key=True)

    def as_dict(self):
        return {
            'id': self.id,
            'email': self.email,
        }


class AuthCode(Base):
    __tablename__ = 'auth_code'

    user_id = Column(BigInteger, nullable=False, primary_key=True)
    token = Column(String, nullable=False)
    code = Column(Integer, nullable=False)
    valid_to = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)

    def as_dict(self):
        return {
            'token': self.token,
            'code': self.code,
            'valid_to': self.valid_to
        }


class UserToken(Base):
    __tablename__ = 'user_token'

    user_id = Column(BigInteger, nullable=False, primary_key=True)
    token = Column(String, nullable=False)
    info = Column(JSON, nullable=False, default='{}')


class Session(Base):
    __tablename__ = 'session'

    user_id = Column(BigInteger, nullable=False, primary_key=True)
    session = Column(String, nullable=False)
    valid_to = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)


class Chat(BaseInfo):
    __tablename__ = 'chat'

    owner_id = Column(BigInteger, nullable=False)
    title = Column(String, nullable=False)


class ChatMember(Base):
    __tablename__ = 'chat_member'

    chat_id = Column(BigInteger, nullable=False, primary_key=True)
    user_id = Column(BigInteger, nullable=False)


class Contact(Base):
    __tablename__ = 'contact'

    id = Column("id", BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey('user.id'), nullable=False)
    contact_id = Column(BigInteger, ForeignKey('user.id'), nullable=False)

    def as_dict(self):
        return {
            'user_id': self.contact_id,
        }
