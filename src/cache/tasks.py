from invoke import task

from cache.cache import flushdb


@task
def flush_db(ctx):
    flushdb()
