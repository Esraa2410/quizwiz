import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormsField } from 'src/app/modules/shared/models/shared';
import { IData, IResetPasswordRequest, IResetPasswordResponse } from '../../models/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(  private _AuthService :AuthService ,
    private _HelperService : HelperService ,
    private _Router :Router
  ){

  }


  resetPasswordPassForm: FormGroup = new FormGroup({
    otp: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required 
                                   // ,Validators.pattern(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&*]).{6,}$/)
                                  ]),

  })

  formList: IFormsField[] = [
    {
      label: 'Your email address',
      placeholder: 'type your email',
      iconClass: 'fa-solid fa-envelope',
      controlName: 'email',
      type: 'email '
    },
    {
      label: 'Otp',
      placeholder: 'Type your otp' ,
      iconClass: 'fa-solid fa-envelope',
      controlName: 'otp',
      type: 'otp '
    } ,
    {
      label: 'Password',
      placeholder: 'type your password',
      iconClass: 'fa-solid fa-key',
      controlName: 'password',
      type: 'password '
    }
  ]

  resetPassword(resetPassForm: FormGroup) {
    this._AuthService.resetPassword(resetPassForm.value).subscribe({
      next: (res:IResetPasswordResponse) => {
        this._HelperService.success(res.message)
        console.log(res)
      },
      error: (error: HttpErrorResponse) => {
        this._HelperService.error(error)
      },
      complete: () => {
        this._Router.navigate(['/auth/login'])
      }
    })
  }
 
}
