import os
from logging.config import dictConfig
from invoke import task, Collection

import settings as app_settings
from db import tasks as db_tasks

LOCAL_SETTINGS = 'settings_local.py'


@task
def runtests(ctx):
    """
    Starts tests
    """
    ctx.run('python -m pytest -s tests api/tests db/tests workers/tests')


@task
def init_config(ctx, db_connection, silent=False):
    settings_local = '''
LOG_LEVEL = 'DEBUG'
DB_CONNECTION = '{db_connection}'
    '''.format(db_connection=db_connection)

    settings_local_path = os.path.join(
        app_settings.PROJECT_ROOT, LOCAL_SETTINGS)
    if os.path.isfile(settings_local_path):
        if silent:
            exit(0)

        print('{} already exists'.format(LOCAL_SETTINGS))
        exit(1)

    with open(settings_local_path, 'w') as settings_file:
        settings_file.write(settings_local)


dictConfig(app_settings.LOGGING)

ns = Collection()
ns.add_collection(Collection.from_module(db_tasks), name='db')
ns.add_task(runtests)
ns.add_task(init_config)
