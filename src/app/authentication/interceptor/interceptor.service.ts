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

        let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkc2wxNTAyMTk5NkBnbWFpbC5jb20iLCJleHAiOjE1OTI2OTk3ODAsImlhdCI6MTU5MjY4MTc4MH0.Ac1Y1KDNAVl65HIz9Ykc9WTey0a4u14dfg7iBBcm_u4i7I5uRMLnrrK36rHc_lp_7TdEWN7JO0y5-KBRvsgKrw'
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

        return next.handle(request);
    }
}
