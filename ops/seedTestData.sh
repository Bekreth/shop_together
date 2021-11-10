#!/bin/sh
PORT=5984
ADDRESS=http://admin:password@localhost:$PORT
ORG=org.couchdb.user
USER=shop_together
SHOPPING_LIST=shopping_lists


for FILE in $(find ops/testData -type f); do
    echo Adding $FILE into the database;
    curl $ADDRESS/$SHOPPING_LIST/ \
        -X PUT \
        -H "Content-Type: application/json" \
        -T $FILE;
done;