export type IGroupsListRes = IGroupsListRes2[]

export interface IGroupsListRes2 {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}