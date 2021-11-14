import { ListData, ListMetadata } from "listData";
import PouchDB from "pouchdb";

// TODO: have these values be configurable from the constructor
const scheme = "http"
const host = "192.168.1.7"
const port = "5984"
const databaseName = "group_lists"
const username = "shop_together"
const password = "password"

// TODO: migrate views json here

export default class ListStorage {
  private db: PouchDB.Database;

  constructor() {
    console.log("Started the db connect")
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

  async getListNames(): Promise<string[]> {
    const message = await this.db.query("list_views.json/listNames", {reduce: true})
    const output: string[] = message.rows.map(row => row.value)[0]
    return output
  }

  async getListByName(name: string): Promise<ListData> {
    const message = await this.db.query("list_views.json/listByName", {key: name})
    const output: ListData = message.rows[0].value
    return output
  }

  async createList(data: ListData): Promise<string> {
    const putObject = await this.db.put(data)
    return putObject.rev
  }

  async updateList(data: ListData): Promise<ListData> {
    const putObject = await this.db.put(data)
    data._rev = putObject.rev
    return data
  }

}