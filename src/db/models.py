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
from sqlalchemy.schema import UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

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


class Account(BaseInfo, Base):
    __tablename__ = 'account'

    email = Column(String, nullable=False, unique=True)
    profile_id = Column(BigInteger, ForeignKey('account_profile.id'), nullable=True)

    profile = relationship('AccountProfile', foreign_keys=[profile_id], lazy='subquery')

    def as_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.profile.first_name if self.profile is not None else '',
            'last_name': self.profile.last_name if self.profile is not None else '',
        }


class AccountProfile(BaseInfo, Base):
    __tablename__ = 'account_profile'

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }


class AuthCode(Base):
    __tablename__ = 'auth_code'

    account_id = Column(BigInteger, nullable=False, primary_key=True)
    token = Column(String, nullable=False)
    code = Column(Integer, nullable=False)
    valid_to = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)

    def as_dict(self):
        return {
            'token': self.token,
            'code': self.code,
            'valid_to': self.valid_to
        }


class AccountToken(Base):
    __tablename__ = 'account_token'

    account_id = Column(BigInteger, nullable=False, primary_key=True)
    token = Column(String, nullable=False)
    info = Column(JSON, nullable=False, default='{}')


class Chat(Base):
    __tablename__ = 'chat'

    id = Column("id", BigInteger, primary_key=True, autoincrement=True)

    def as_dict(self):
        return {
            'id': self.id,
        }


class ChatMember(Base):
    __tablename__ = 'chat_member'

    chat_id = Column(BigInteger, nullable=False, primary_key=True)
    account_id = Column(BigInteger, nullable=False)


class Contact(Base):
    __tablename__ = 'contact'

    id = Column("id", BigInteger, primary_key=True, autoincrement=True)
    owner_id = Column(BigInteger, ForeignKey('account.id'), nullable=False)
    email = Column(String, nullable=False)
    UniqueConstraint('owner_id', 'email')

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    contact_id = Column(BigInteger, ForeignKey('account.id'), nullable=True)

    def as_dict(self):
        return {
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'contact_id': self.contact_id,
        }
