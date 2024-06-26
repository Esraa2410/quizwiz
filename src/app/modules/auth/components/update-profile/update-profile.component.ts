import { IFormsField } from 'src/app/modules/shared/models/shared';
import { Router } from '@angular/router';
import { IUpdateProfileReq, IUpdateProfileRes } from './../../models/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  firstName:any;
  lastName:any;
  email:any;
  registerForm:FormGroup=new FormGroup('');

  constructor(private _Router: Router, private _AuthService: AuthService,
    private _HelperService: HelperService) {  }

    ngOnInit(){
      this.firstName= localStorage.getItem('firstName');
      this.lastName= localStorage.getItem('lastName');
      this.email= localStorage.getItem('email');
      console.log(this.firstName,this.lastName,this.email);

      this.registerForm= new FormGroup({
        email: new FormControl(this.email, [Validators.required, Validators.email]),
        first_name: new FormControl(this.firstName, [Validators.required]),
        last_name: new FormControl(this.lastName, [Validators.required])
      })

    }






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
    }
  ]



  onUpdateProfile(data: FormGroup) {
    this._AuthService.updateProfile(data.value).subscribe({
      next: (res: IUpdateProfileRes) => {
        console.log(res);
        this._HelperService.success(res.message);
      },
      error: (err: HttpErrorResponse) => {
        this._HelperService.error(err.error.message);
        console.log(err);
      }, complete: () => {
        this._Router.navigate(['/auth/login'])
      }
    })
  }
}
