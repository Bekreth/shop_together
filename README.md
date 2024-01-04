# About
Shop Together is a "simple" shopping list app intended for self managed deployment.
This aimed to solve the problem of "I live with multiple people and we need to keep
a group shopping list" without having to buy into some invasive third service.
This application is _very_ crude and only partially complete, but it's officially
crossed the threshold for "minimum viable product".  If you setup and install this,
you fully acknowledge the following:
1. Things will mostly kinda work if you know how to handle CouchDB and Docker
2. Updates before an official 1.0.0 release will come slowly and likely won't 
	 contain upgrade methodology.
3. You own _ALL_ of your data.  There's nothing I can do if you mess up and delete 
	 something that you shouldn't have.

With that, let's get you reasonably started.


## Running Application
This app was made offline-first.  If you can start the docker image and sort the
networking, the app will work for you, but it will miss the all important "share with
flatmates" feature that you may be after.  To get the flatmate sharing functional, you
have to successfully start up a CouchDB server or find someone you know how can do it
for you.  The files found in `ops` are a good starting point for configuration and 
setup, but they're not really meant for a production system that will live on the
open internet.  _You are responsible for proper security it you expose your data!_

Once you get the app running, the main thing you'll need to do in CouchDB is
1. Setup CORS properly (really headache if you muck this one up)
2. Add username/login credentials for your various flatmates
3. Create a database with ${SOME_NAME}
From your `shop_together` app, you'll go to profile (upper right hand corner) and 
create a Server with the connection information from your CouchDB (host, port, username,
password, etc).  Then you will create a database with ${SOME_NAME} and attach the
server you just created.  With that done, you can now create as many lists as you want
in the database from the hamburger dropdown on the left.

### FAQ
**Q. Why are servers and databases seperate?**
**A.** The idea I had is that a database is a single shared list.  You can have a list
by yourself (no server necessary at all), a list with a few people (one DB and one server
for syncing) or different lists with different people.  To allow for optimal flexibility,
servers and databases need to be kept separate.  It was my goal to have your user profile
also be backed up in a database, so you could "log in" from multiple devices and
immediately pull down your DB/server configs, but I haven't gotten to it yet, so each
device needs to be "registered" like above.  Again, this is an MVP pre-release build.


## Contributions
If you're so inclined to contribute, you can do so by either filling out an issue to
explain what you want, or create a PR.  This is very low on my list of priorities, but
who doesn't get excited about random PRs/Issue requests on their silly little GitHub
projects.

### Development Startup
If you want to do a PR, here's some setup stuff for local development
```bash
yarn
yarn start
docker network create local_testing_network
make start_couchdb
make .seed_couchdb # only do on the first install, also, most the seed data is defunct
                   # at this point, but I don't have the time to fix it yet.
```

Starts the website at port 3000
Starts the DB at port 5984. Web portal accessible via http://localhost:5984/_utils as
admin:password.  Connecting the React app can be done by adding the server with
shop_together:password.
