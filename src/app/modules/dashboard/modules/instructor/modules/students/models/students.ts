export interface IStudent {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: IGroup;
}

export interface IStudentWithoutGroup extends Omit<IStudent, 'group'> {}

export interface IGroup {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IAddStudToGroupReq {
  student_id: string;
  group_id: string;
}

export interface IAddStudToGroupRes {
  data: IAddStudToGroupResData1;
  message: string;
}

export interface IAddStudToGroupResData1 {
  data: IAddStudToGroupResData2;
  message: string;
}

export interface IAddStudToGroupResData2 {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: Student[];
  max_students: number;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export type Root = IStudentWithoutGroupRes[];

export interface IStudentWithoutGroupRes {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
}



export interface IDeleteStudentRes {
  data: IDeleteData;
  message: string;
}

export interface IDeleteData {
  _id: string
  first_name: string
  last_name: string
  email: string
  status: string
  role: string
  group: string
}