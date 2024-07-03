import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChangeReq, IChangeRes, IForget, IForgetRes, IResetPasswordRequest, IResetPasswordResponse, IRegisterReq,
   IRegisterRes, ILogin, ILoginReq ,ILogoutRes ,IUpdateProfileRes,IUpdateProfileReq} from '../models/auth';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedInUserSubject = new BehaviorSubject<ILoginReq>({
    data: {
      accessToken: '',
      profile: {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        status: '',
      },
      refreshToken: '',
    },
    message: '',
  });

  private updatedProfile = new BehaviorSubject<IUpdateProfileRes>({
    data: {
      _id: '',
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      status: '',
    },
    message: ''
  })

  loggedInUser$ = this.loggedInUserSubject.asObservable();

  profileUpdatedData$ = this.updatedProfile.asObservable();

  constructor(private _HttpClient: HttpClient) {  }

  getLoggedInUser(userData: ILoginReq): void {
    this.loggedInUserSubject.next(userData);
  }

  profileUpdated(userData: IUpdateProfileRes): void {
    this.updatedProfile.next(userData);
  }

  forgetPassword(forgetData: IForget): Observable<IForgetRes> {
    return this._HttpClient.post<IForgetRes>('auth/forgot-password', forgetData)
  }

  changePassword(changeData: IChangeReq): Observable<IChangeRes> {
    return this._HttpClient.post<IChangeRes>('auth/change-password', changeData)
  }


  register(registerData: IRegisterReq): Observable<IRegisterRes> {
    return this._HttpClient.post<IRegisterRes>('auth/register', registerData)
  }

  resetPassword(resetPasswordData: IResetPasswordRequest): Observable<IResetPasswordResponse> {
    return this._HttpClient.post<IResetPasswordResponse>('auth/reset-password', resetPasswordData)
  }

  login(loginData: ILogin): Observable<ILoginReq> {
    return this._HttpClient.post<ILoginReq>('auth/login', loginData)
  }

  logout(): Observable<ILogoutRes> {
    return this._HttpClient.get<ILogoutRes>('auth/logout')
  }


  updateProfile(data: IUpdateProfileReq): Observable<IUpdateProfileRes> {
    return this._HttpClient.put<IUpdateProfileRes>('instructor', data)
  }
  updateProfileStudent(data: IUpdateProfileReq): Observable<IUpdateProfileRes> {
    return this._HttpClient.put<IUpdateProfileRes>('student', data)
  }

  welcomeVoice(message: string): void {
    const sp = new SpeechSynthesisUtterance(message);
    [sp.voice] = speechSynthesis.getVoices();
    speechSynthesis.speak(sp);
  }

}
