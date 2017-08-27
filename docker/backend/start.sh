#!/bin/bash

service ssh start

mkdir -p logs
pip install --pre -U -r /app/src/.meta/packages

# sh ./wait-for-it.sh db:6000 -- echo "Postgresql is up"
invoke init_config --db-connection="$DB_CONNECTION" --redis-connection "$REDIS_CONNECTION" --silent
invoke db.migration_apply

gunicorn app:app -c gunicorn.conf.py --reload
