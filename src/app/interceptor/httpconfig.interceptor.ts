import { StoreService } from './../services/store.service';
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
  HttpErrorResponse,
} from '@angular/common/http';

import {
  Observable,
  throwError,
  BehaviorSubject,
  fromEvent,
  of,
  forkJoin,
} from 'rxjs';
import { map, catchError, finalize, tap, mergeMap } from 'rxjs/operators';
import { BitcoinService } from '../bitcoin.service';
import { HttpTransformService } from '../services/http-transform.service';
import { HttpRequestObject } from '../models/httpRequest.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable()
export class HttpConfigInterceptorV implements HttpInterceptor {
  constructor(
    private service: InterceptHttpService,
    private authService: AuthService,
    private router: Router,
    private dataService: StoreService,
    private dbService:NgxIndexedDBService,
    private transformService:HttpTransformService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.checkToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
    }


    if (!navigator.onLine) {

      let object:HttpRequestObject=this.transformService.requestToObject(request);
      this.dbService.add('requestStore',{object})
      .subscribe((res)=>{
        console.log("Data added successfully")
      })
      this.dataService.saveRequest(request);
      return of(new HttpResponse({ body: this.dataService.getResponse() }));
    }

    fromEvent(window, 'online')
      .pipe(map((event: any) => event.target.value))
      .subscribe();

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('GRESKA 401');
              //this.authService.onInit();
              return;
            }
            // this.router.navigate(['login']);
          }
        }
      )
    );
  }
}


