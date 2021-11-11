#!/bin/sh
BASE_DIR=$1
PORT=5984
ADDRESS=http://admin:password@localhost:$PORT
ORG=org.couchdb.user
USER=shop_together
SHOPPING_LIST=shopping_lists



for FILE in $(cd $BASE_DIR; find group_lists -maxdepth 1 -type f); do
    echo Adding $FILE into the database;
    curl $ADDRESS/$FILE \
        -X PUT \
        -H "Content-Type: application/json" \
        -T $BASE_DIR/$FILE;
done;