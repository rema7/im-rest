from functools import wraps
import pickle

from cache import cache

from db.session import open_db_session


def with_db_session(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if kwargs.get('db_session') is None:
            with open_db_session() as db_session:
                kwargs['db_session'] = db_session
                return fn(*args, **kwargs)

        return fn(*args, **kwargs)

    return wrapper


def cached_call(key):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            value = cache.get_from_cache(key)
            if value is None:
                value = func(*args, **kwargs)
                cache.set_to_cache(key, pickle.dumps(value))
            elif isinstance(value, bytes):
                value = pickle.loads(value)
            return value
        return wrapper
    return decorator
