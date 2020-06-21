import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class InterceptorService implements HttpInterceptor {
  
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
  
      if (sessionStorage.getItem('token')) {
        request = request.clone({
          setHeaders: {
            Authorization: sessionStorage.getItem('token')
          }
        })
      }
      return next.handle(request);
    }
  }