import { inputUnstyledClasses } from "@mui/base";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { ListData, StorageMetadata } from "listData";
import { databaseName, host, password, port, scheme, username } from "listStorage";
import PouchDB from "pouchdb";

const design_doc = 'list_views.json'
enum View {
  ConflictingLists = 'conflictingLists',
  ListByName = 'listByName',
  ListNames = 'listNames',
}

const get_view = (view: View) => {
  return `${design_doc}/${view}`
}

export class ListStorage {
  private db: PouchDB.Database;
  private watching?: PouchDB.Core.Changes<ListData>

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

    // this.db.destroy()
    PouchDB.sync(remoteDB, this.db, options)
  }

  async getListNames(): Promise<string[]> {
    const message = await this.db.query(get_view(View.ListNames), {reduce: true})
    const output: string[] = message.rows.map(row => row.value)[0]
    return output
  }

  async getListByName(name: string): Promise<ListData> {
    const message = await this.db.query(get_view(View.ListByName), {key: name})
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


  watchList(input: StorageMetadata, setListData: (data: ListData) => void) {
    if (this.watching !== undefined) this.watching.cancel()

    const {_id} = input
    this.watching = this.db.changes<ListData>({
      since: 'now',
      live: true,
      include_docs: true,
      doc_ids: [_id],
    }).on("change", (change) => {
      if (change.doc === undefined) return
      setListData(change.doc)
    })
  }

  /*
  async handleConflicts() {
    const message = await this.db.query("list_views.json/conflictingLists")
    message.rows
      .flatMap
      .map
      .reduceRight(this.reducePromises)
      .then
  }

  */

}