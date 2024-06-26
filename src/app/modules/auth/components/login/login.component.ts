import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormsField } from 'src/app/modules/shared/models/shared';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { ILoginReq } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { Role } from 'src/app/core/enums/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private userData: ILoginReq = {
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
  };
  private _AuthService = inject(AuthService);
  private _HelperService = inject(HelperService);
  private _Router = inject(Router)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
      ),
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
  });

  formList: IFormsField[] = [
    {
      controlName: 'email',
      iconClass: 'fa-solid fa-envelope',
      label: 'Email',
      placeholder: 'Type your email',
      type: 'email',
    },
    {
      controlName: 'password',
      iconClass: 'fa-solid fa-key',
      label: 'Password',
      placeholder: 'Type your password',
      type: 'password',
    },
  ];

  onLogin(loginForm: FormGroup) {
    this._AuthService.login(loginForm.value).subscribe({
      next: (res: ILoginReq) => {
        this.userData = res;
       // console.log('Login response data:', this.userData);
      },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
      complete: () => {
        this._HelperService.success('Welcome Back');
        this._AuthService.welcomeVoice(
          `Welcome Back ${this.userData.data.profile.first_name} ${this.userData.data.profile.last_name}`
        );
        localStorage.setItem('role', this.userData.data.profile.role);
        localStorage.setItem('userToken', this.userData.data.accessToken);
        localStorage.setItem('email', this.userData.data.profile.email);
        localStorage.setItem('firstName', this.userData.data.profile.first_name);
        localStorage.setItem('lastName', this.userData.data.profile.last_name);
        localStorage.setItem('userName', `${this.userData.data.profile.first_name} ${this.userData.data.profile.last_name}`)
       // console.log('Emitting loggedInUser data from onLogin:', this.userData);
        this._AuthService.getLoggedInUser(this.userData);
        this._Router.navigate(['/dashboard']);
      },
    });
  }

}
