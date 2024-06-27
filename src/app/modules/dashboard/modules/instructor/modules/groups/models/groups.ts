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

export interface IUpdateOrAddGroup{
  name: string
  students: string[]
}

export interface IUdateGroupRes {
  data: IGroupDetailsRes
  message: string
}

export interface IStudentWithoutGroup{
  _id: string
  first_name: string
  last_name: string
  email: string ,
  status:string,
  role :string
}


//for students will be removed after making student model
export interface IAllStudents {
  _id: string
  first_name: string
  last_name: string
  email: string
  status: string
  role: string
  group: IGroupForStudent
}

export interface IGroupForStudent {
  _id: string
  name: string
  status: string
  instructor: string
  students: string[]
  max_students: number
  updatedAt: string
  createdAt: string
  __v: number
}