import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChangeReq, IChangeRes, IForget, IForgetRes, IResetPasswordRequest, IResetPasswordResponse, IRegisterReq, IRegisterRes, ILogin, ILoginReq ,ILogoutRes} from '../models/auth';
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

  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private _HttpClient: HttpClient) {
    console.log('Initialized loggedInUserSubject with default value:', this.loggedInUserSubject.value);
  }

  getLoggedInUser(userData: ILoginReq): void {
    console.log('Emitting loggedInUser data:', userData);
    this.loggedInUserSubject.next(userData);
    console.log('Current loggedInUserSubject value:', this.loggedInUserSubject.value);

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

  welcomeVoice(message: string): void {
    const sp = new SpeechSynthesisUtterance(message);
    [sp.voice] = speechSynthesis.getVoices();
    speechSynthesis.speak(sp);
  }

}
