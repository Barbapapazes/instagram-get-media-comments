export interface Comment {
  username: string
  association: string
  company: string
}

export interface Response {
  data: Datum[]
  paging?: Paging
}

export interface Datum {
  id: string
  timestamp: string
  username: string
  text: string
}

export interface Paging {
  cursors?: Cursors
  next?: string
  previous?: string
}

export interface Cursors {
  before?: string
  after?: string
}
