#!/usr/bin/env bash

# Step 1 - Prepare venv
VENV_PATH=./venv

python3.6 -m venv $VENV_PATH

source $VENV_PATH/bin/activate
pip3 install --upgrade pip==9.0.1

# Step 3 - Run js tests
pip3 install nodeenv
nodeenv --node=6.9.1 --python-virtualenv --prebuilt

deactivate
. $VENV_PATH/bin/activate

cd ./frontend

# npm set registry $SINOPIA_URL --always-auth
npm install -g npm-cache
npm-cache install

npm ls --depth=0

npm run eslint:ci
npm run stylelint:ci
npm run test
