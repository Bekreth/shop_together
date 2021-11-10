import PouchDB from "pouchdb";

const scheme = "http"
const host = "localhost"
const port = "5984"
const databaseName = "shopping_lists"

export default class ListStorage {
  private db: PouchDB.Database;

  constructor(){
    this.db = new PouchDB(databaseName)
    const remote = `${scheme}://${host}:${port}/${databaseName}`;

    const options = {
      live: true,
      retry: true,
      continuous: true,
      auto_compaction: true
    }

    this.db.sync(remote, options)

    this.db.get("62e6d79cbfb4faf5ca698116050002d2")
      .then(file => {
        console.log("success")
        console.log(file)
      })
      .catch(err => {
        console.log("err")
        console.log(err)
      })
  }
}