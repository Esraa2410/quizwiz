import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormsField } from 'src/app/modules/shared/models/shared';
import { AuthService } from '../../services/auth.service';
import { IChangeRes } from '../../models/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  private _AuthService = inject(AuthService);
  private _HelperService = inject(HelperService);
  private _Router = inject(Router);

  changePassForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]),
    password_new: new FormControl(null, [Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)])
  })

  formList: IFormsField[] = [
    {
      label: 'Old Password',
      placeholder: 'type your old password',
      iconClass: 'fa-solid fa-key',
      controlName: 'password',
      type: 'password'
    },
    {
      label: 'New Password',
      placeholder: 'type your new password',
      iconClass: 'fa-solid fa-key',
      controlName: 'password_new',
      type: 'password '
    }
  ]

  onChangePass(changePassForm: FormGroup) {
    this._AuthService.changePassword(changePassForm.value).subscribe({
      next: (res: IChangeRes) => {
        this._HelperService.success(res.message)
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
