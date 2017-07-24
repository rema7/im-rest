#!/bin/bash

NODE_MODULES="./node_modules"

if [ "$(ls -A $NODE_MODULES)" ]; then
    echo "Node environment is ready. Clear it for reloading"
else
    npm install
fi

npm run dev:server
