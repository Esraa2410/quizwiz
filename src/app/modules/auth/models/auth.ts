export interface IForget {
  email: string;
}

export interface IForgetRes {
  message: string;
}


export interface IChangeReq {
  email: string;
  password: string;
  password_new: string
}
export interface IChangeRes {
  message: string
  data: IChangeResData
}

export interface IChangeResData {
  _id: string
  first_name: string
  last_name: string
  email: string
  status: string
  role: string
}
export interface IResetPasswordRequest{
  otp:string,
  email:string,
  password:string
}