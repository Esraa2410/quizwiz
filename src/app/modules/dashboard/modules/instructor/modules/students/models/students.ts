export interface IAddStudToGroupReq {
    student_id: string
    group_id: string
  }

export interface IAddStudToGroupRes {
    data: IAddStudToGroupResData1
    message: string
  }
  
  export interface IAddStudToGroupResData1 {
    data: IAddStudToGroupResData2
    message: string
  }
  
  export interface IAddStudToGroupResData2 {
    _id: string
    name: string
    status: string
    instructor: string
    students: Student[]
    max_students: number
  }
  
  export interface Student {
    _id: string
    first_name: string
    last_name: string
    email: string
  }