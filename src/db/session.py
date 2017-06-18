from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import settings as app_settings

engine = create_engine(app_settings.DB_CONNECTION)

Session = sessionmaker(bind=engine)


@contextmanager
def open_db_session():
    session = Session()
    try:
        yield session
    except:
        session.rollback()
        raise

    session.close()
