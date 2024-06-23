import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const baseUrl: string = 'https://upskilling-egypt.com:3005/api/';
    const token: string = localStorage.getItem('userToken') ?? '';
    const modifiedReq = request.clone({
      url: baseUrl + request.url,
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next.handle(modifiedReq);
  }
}
