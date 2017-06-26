#!/usr/bin/env bash
set -e

# Step 1 - Prepare venv
VENV_PATH=$CHECKOUT_DIR/../venv
SRC_PATH=$CHECKOUT_DIR/src

if [[ $CLEAR_ENV == "True" ]]
then
  rm -rf $VENV_PATH
fi
virtualenv --python=python3.6 $VENV_PATH

source $VENV_PATH/bin/activate
pip install --upgrade pip==8.1.2
pip install -r $SRC_PATH/.meta/packages.dev

# Step 3 - Run python tests
cd $SRC_PATH
mkdir -p logs
pylint ./*
flake8 ./*
inv runtests
