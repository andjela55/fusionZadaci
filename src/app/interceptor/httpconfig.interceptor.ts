import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { InterceptHttpService } from './../intercept-http.service';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';
import { BitcoinService } from '../bitcoin.service';

@Injectable()
export class HttpConfigInterceptorV implements HttpInterceptor {

    
  
    constructor(private service:InterceptHttpService,private authService:AuthService,private router:Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      //this.service.setAllRequests();
     if(this.authService.isUserLoggedIn()){
        request=request.clone({
            setHeaders:{
                Authorization:`Bearer ${this.authService.getToken()}`
            }
        });
     }
    /*
     return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            return event;
        }));
        */
    return next.handle(request).pipe( tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
        }
    },
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
            console.log("GRESKA 401")
         return;
        }
        this.router.navigate(['login']);
      }
    }));
 }

}
