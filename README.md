### Quickstart

### Build server
##### Additional dependencies

Activate virtualenv and install python packages:

    $ mkvirtualenv virt-env -p python3
    (virt-env) $ pip install -r ./src/.meta/packages
    (virt-env) $ cd ./src
    
##### Init database
Configure database:

    postgres=# CREATE DATABASE test_db;
    postgres=# \c test_db
    test_db=# CREATE USER test_db WITH PASSWORD 'test_db';
    test_db=# GRANT ALL PRIVILEGES ON DATABASE test_db TO test_db;

Configure settings:
    
    (virt-env) $ inv init_config 'postgresql+psycopg2://test_db:test_db@localhost/test_db'

Run migration scripts:

    (virt-env) $ inv db.migration_apply


### Run server

    (virt-env) $ gunicorn -b 0.0.0.0:8100 app:app

### Build frontend
##### Additional dependencies

Install npm dependencies:

    $ cd ./frontend
    $ npm install

##### Run frontend

    $ webpack-dev-server
    
Use next address in browser: http://localhost:8110/

### Run via docker

    (virt-env)$ cd docker
    (virt-env)$ docker-compose up
