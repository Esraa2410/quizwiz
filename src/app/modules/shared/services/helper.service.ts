import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private _ToastrService: ToastrService) {}

  error(error: HttpErrorResponse): void {
    this._ToastrService.error(error.error.message, 'Error')
  }

  success(successMessage: string): void {
    this._ToastrService.success(successMessage, 'Success');
  }

  info(infoMessage: string): void {
    this._ToastrService.info(infoMessage, 'Heads up');
  }
}
