import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChangeReq, IChangeRes, IForget, IForgetRes, IResetPasswordRequest, IResetPasswordResponse } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  forgetPassword(forgetData: IForget): Observable<IForgetRes> {
    return this._HttpClient.post<IForgetRes>('auth/forgot-password', forgetData)
  }

  changePassword(changeData: IChangeReq): Observable<IChangeRes> {
    return this._HttpClient.post<IChangeRes>('auth/change-password', changeData )
  }
  resetPassword(resetPasswordData:IResetPasswordRequest) :Observable<IResetPasswordResponse>{
    return this._HttpClient.post<IResetPasswordResponse>('auth/reset-password', resetPasswordData )
  }
}
