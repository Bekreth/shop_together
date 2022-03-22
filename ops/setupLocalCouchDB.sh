#!/bin/sh
PORT=5984
ADDRESS=http://admin:password@localhost:$PORT
ORG=org.couchdb.user
USER=shop_together
LIST=group_lists

echo
echo "Configuring single node cluster"
curl $ADDRESS/_cluster_setup \
    -X POST \
    -H "Content-Type: application/json" \
    -d '
{
  "action": "enable_single_node", 
  "username": "username", 
  "password": "password", 
  "bind_address": "0.0.0.0", 
  "port": '$PORT', 
  "singlenode": true 
}    
';

echo
echo "Created users"
curl $ADDRESS/_users/$ORG:$USER \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '
{
    "name": "'$USER'", 
    "password": "password",
    "roles": [],
    "type": "user" 
}'

echo
echo "Creating shopping list database";
curl $ADDRESS/$LIST -X PUT;

echo
echo "Creating shopping list views";
curl $ADDRESS/$LIST/_design/list_views.json \
    -X PUT \
    -H "Content-Type: application/json" \
    -T group_lists/_design/list_views.json;

echo
echo "Assigning users to databases";
curl $ADDRESS/$LIST/_security \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '
{
    "admins": {
        "names": [], 
        "roles": []
    },
    "members": {
        "names": ["'$USER'"],
        "roles": []
    }
}
'

echo
echo "Setting up CORS"
ENABLE_CORS="_node/nonode@nohost/_config/httpd/enable_cors"
CORS_BASE="_node/nonode@nohost/_config/cors"
curl $ADDRESS/$ENABLE_CORS \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '"true"'
curl $ADDRESS/$CORS_BASE/origins \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '"*"'
curl $ADDRESS/$CORS_BASE/credentials \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '"true"'
curl $ADDRESS/$CORS_BASE/headers \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '"accept, authorization, content-type, origin, referer"'
curl $ADDRESS/$CORS_BASE/methods \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '"GET, PUT, POST, HEAD, DELETE"'
