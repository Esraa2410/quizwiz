import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormsField } from 'src/app/modules/shared/models/shared';
import { AuthService } from '../../services/auth.service';
import { IForgetRes } from '../../models/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  private _AuthService = inject(AuthService);
  private _HelperService = inject(HelperService);

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  formList: IFormsField[] = [
    {
      label: 'Email address',
      placeholder: 'type your email',
      iconClass: 'fa-solid fa-envelope',
      controlName: 'email',
      type: 'email'
    }
  ]

  onForget(forgetForm: FormGroup) {
    this._AuthService.forgetPassword(forgetForm.value).subscribe({
      next: (res: IForgetRes) => {  },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
      complete: () => this._HelperService.info('Check out your email')
    })
  }
}
