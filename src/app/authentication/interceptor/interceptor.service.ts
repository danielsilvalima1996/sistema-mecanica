import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



        // if (sessionStorage.getItem('token')) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: sessionStorage.getItem('token')
        //         }
        //     })
        // }

        let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGlzb24ua2V1dmVyQGdtYWlsLmNvbSIsImV4cCI6MTU5Mjg5NjQyNiwiaWF0IjoxNTkyODYwNDI2fQ.DT1-CtbCFuuqW-iCMWtAR2QOCyCmgOgREiTuX6lDvHR6N8FQxj4OFE1g4GFhcqnHUx69iZQT2zj6D-zhd4fX0Q'
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

        return next.handle(request);
    }
}
