export type IGroupsListRes = IGroupsListRes2[]

export interface IGroupsListRes2 {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}

export interface IGroupDetailsRes {
  _id: string
  name: string
  status: string
  instructor: string
  students: IStudent[]
  max_students: number
}

export interface IStudent {
  _id: string
  first_name: string
  last_name: string
  email: string
}

export interface IUpdateGroup{
  name: string
  students: string[]
}

export interface IUdateGroupRes {
  data: IGroupDetailsRes
  message: string
}

