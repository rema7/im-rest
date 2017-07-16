import logging
import pickle

from redis import (
    Redis,
    ResponseError,
    ConnectionError as RedisConnectionError,
)

import settings as app_settings


im_redis = Redis().from_url(app_settings.REDIS_CONNECTION)
logger = logging.getLogger('im-rest.' + __name__)


def redis_decorator(func):
    def wrapped(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except (ResponseError, RedisConnectionError) as e:
            logger.error(e)

    return wrapped


@redis_decorator
def get_from_cache(key):
    value = im_redis.get(key)
    if value is not None:
        value = pickle.loads(value)
    return value


@redis_decorator
def get_keys(pattern):
    return im_redis.keys(pattern)


@redis_decorator
def set_to_cache(key, value):
    if value is not None:
        value = pickle.dumps(value)
    im_redis.set(key, value)


@redis_decorator
def delete(*keys):
    im_redis.delete(*keys)


@redis_decorator
def flushdb():
    im_redis.flushdb()

