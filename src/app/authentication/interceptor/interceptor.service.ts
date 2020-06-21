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

        let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkc2wxNTAyMTk5NkBnbWFpbC5jb20iLCJleHAiOjE1OTU2MzE3NjMsImlhdCI6MTU5Mjc1MTc2M30.uuKVjYNvToGIOcXBS8YOVlA0A2INOfATbEjEC78eXkhZDxOKXHWNZO4WDWcugwm0HaGH61Xp-GPp0Jwso_10CA'
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })

        return next.handle(request);
    }
}
