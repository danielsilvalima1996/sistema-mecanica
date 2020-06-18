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


        let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkc2wxNTAyMTk5NkBnbWFpbC5jb20iLCJleHAiOjE1OTI0NTQ0NTksImlhdCI6MTU5MjQzNjQ1OX0.nPg_6h6AhQlFgNjb7q15AsDkpJ42yCbvA917cgyN4BqitWBwh0lHxI2A4DZiSnTmYdwNN1y89e1BlxmZAb2lJg'
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })



        return next.handle(request);
    }
}
