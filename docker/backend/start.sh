#!/bin/bash

service ssh start

mkdir -p logs
pip install --pre -U -r /app/src/.meta/packages

invoke init_config --db-connection="$DB_CONNECTION" --silent
invoke db.migration_apply

gunicorn app:app -c gunicorn.conf.py --reload
