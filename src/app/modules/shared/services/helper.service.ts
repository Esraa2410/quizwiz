import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private loadginSubject: Subject<boolean> = new Subject<boolean>();
  loading$ = this.loadginSubject.asObservable();

  show(): void {
    this.loadginSubject.next(true);
  }
  
  hide(): void {
    this.loadginSubject.next(true);
  }
  
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
