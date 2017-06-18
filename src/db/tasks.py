from invoke import task

import settings as app_settings


@task
def migration_apply(ctx):
    print('Start migration apply...')
    command = 'yoyo apply --database {db_connection} migrations --no-config-file --batch'
    ctx.run(command.format(db_connection=app_settings.DB_CONNECTION_YOYO))
    print('Success')
