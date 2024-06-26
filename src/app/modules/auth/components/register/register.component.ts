import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IFormsField } from 'src/app/modules/shared/models/shared';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { AuthService } from '../../services/auth.service';
import { IRegisterRes } from '../../models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private _AuthService = inject(AuthService);
  private _HelperService = inject(HelperService);
  private _Router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.email]),
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)]),
    
  })

  formList: IFormsField[] = [
    {
      label: 'First Name',
      placeholder: 'Type your first name',
      iconClass: 'fa-solid fa-user',
      controlName: 'first_name',
      type: 'text'
    },
    {
      label: 'Last Name',
      placeholder: 'type your last name',
      iconClass: 'fa-solid fa-user',
      controlName: 'last_name',
      type: 'text'
    },
    {
      label: 'Email',
      placeholder: 'type your email',
      iconClass: 'fa-solid fa-envelope',
      controlName: 'email',
      type: 'email'
    },
    {
      label: 'Password',
      placeholder: 'Type your password',
      iconClass: 'fa-solid fa-lock',
      controlName: 'password',
      type: 'password'
    },
    {
      label: 'Role',
      placeholder: 'Choose your role',
      iconClass: 'fa-solid fa-user',
      controlName: 'role',
      type: 'text'
    },
  ]

  onRegister(registerForm: FormGroup) {
    this._AuthService.register(registerForm.value).subscribe({
      next: (res:IRegisterRes) => { },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
      complete: () =>{
         this._HelperService.success('Record created successfully');
         this._Router.navigate(['/auth/login'])

        }
    })
  }

}
