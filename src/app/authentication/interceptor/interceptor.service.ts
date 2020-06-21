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

        let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGlzb24ua2V1dmVyQGdtYWlsLmNvbSIsImV4cCI6MTU5Mjc4MzkxNSwiaWF0IjoxNTkyNzQ3OTE1fQ.4m38V3g5pM4zigOgq8VK3F5G-pZrDcficfKOA8BC9YS2cd0f1EZOdno3_B_XxJ4Bcg63wonB_burZZE-kW3c5Q'
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

        return next.handle(request);
    }
}
