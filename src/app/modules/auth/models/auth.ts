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
  data: IData
}

export interface IData {
  _id: string
  first_name: string
  last_name: string
  email: string
  status: string
  role: string
}


export interface IRegisterReq {
  first_name: string
  last_name: string
  email: string
  password: string
  role: string
}

export interface IRegisterRes {
  message: string;
  data: Data;
}

export interface Data {
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}
export interface IResetPasswordRequest {
  otp: string,
  email: string,
  password: string
}
export interface IResetPasswordResponse {
  data: IData
  message: string;

}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginReq {
  message: string,
  data: ILoginData;
}

export interface ILoginData {
  accessToken: string;
  refreshToken: string;
  profile: ILoginProfile;
}

export interface ILoginProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
}


export interface ILogoutRes {
  message: string;
}