export interface ToDo {

  id: string,
  uid: string,
  title: string,
  description: string,
  files: string[],
  finished: boolean,
  favorite: boolean
}
