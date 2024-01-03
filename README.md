# About

## Development Startup
```bash
yarn
yarn start
docker network create local_testing_network
make start_couchdb
make .seed_couchdb #only do on the first install
```

Starts the website at port 3000
Starts the DB at port 5984. Web portal accessible via http://localhost:5984/_utils as
admin:password.  Connecting the React app can be done by adding the server with
shop_together:password.

## Running Application
Currently, an admin user is needed to make a new database on the server and onboard
users.
