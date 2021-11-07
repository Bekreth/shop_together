
export default interface ListData {
  _id: string
  _rev: string
  name: string
}

export const makeList: (name: string) => ListData = (name: string) => {
  return {
      _id: "Some value",
      _rev: "Gotta make this better",
      name: name
  }
}
