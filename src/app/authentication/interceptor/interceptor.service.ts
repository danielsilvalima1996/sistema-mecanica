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

        let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkc2wxNTAyMTk5NkBnbWFpbC5jb20iLCJleHAiOjE1OTI3NTE3ODAsImlhdCI6MTU5MjcxNTc4MH0.XPyodxG0xcZr5VkW7412K7kksY9uHvHsUjSjvttIrSWzRGb2vwUYFigJBOapmRwfCSaYjeXf3j5el336eKj97A'
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

        return next.handle(request);
    }
}
