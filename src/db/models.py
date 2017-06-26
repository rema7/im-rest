from datetime import datetime

from sqlalchemy import Column, BigInteger, String, TIMESTAMP, JSON
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

    def as_dict(self):
        return {
            'id': self._id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }


class User(BaseInfo, Base):
    __tablename__ = 'user'

    email = Column(String, nullable=False, primary_key=True)

    def as_dict(self):
        return super.as_dict().update({
            'email': self.email,
        })


class AuthCode(Base):
    __tablename__ = 'auth_code'

    token = Column(String, nullable=False, primary_key=True)
    user_id = Column(BigInteger, nullable=False, primary_key=True)
    code = Column(String, nullable=False)
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
