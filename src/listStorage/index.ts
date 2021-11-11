import { ListData, ListMetadata } from "listData";
import PouchDB from "pouchdb";

const scheme = "http"
const host = "localhost"
const port = "5984"
const databaseName = "group_lists"
const username = "shop_together"
const password = "password"

// TODO: migrate views json here

export default class ListStorage {
  private db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB(databaseName)
    const remote = `${scheme}://${host}:${port}/${databaseName}`;
    const remoteDB = new PouchDB(remote, {
      skip_setup: true,
      auth: {
        username: username,
        password: password,
      }
    })

    const options = {
      live: true,
      retry: true,
      continuous: true,
      auto_compaction: true
    }

    PouchDB.sync(remoteDB, this.db, options)
  }

  getListNames(): Promise<ListMetadata[]> {
    return this.db.query("list_views.json/listNames", {reduce: true})
      .then(message => {
        return message.rows.map(row => row.value)
      })
  }

  saveList(list: ListData) {
    this.db.put(list)
      .then(msg => {
        console.log("Success writing")
        console.log(msg)
        console.log("------")
      }).catch(err => {
        console.log("Failed to write")
        console.log(err)
        console.log("------")
      })
  }

  getList() {
    this.db.get("Some value")
      .then(msg => {
        console.log("Success reading")
        console.log(msg)
        console.log("-------")
      })
      .catch(err => {
        console.log("Failed to read")
        console.log(err)
        console.log("-------")
      })
  }
}