import { Data } from './services/login.service';
import { IndexDetails, NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { HttpRequestObject } from './models/httpRequest.model';
import { HttpTransformService } from './services/http-transform.service';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { StoreService } from './services/store.service';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, interval, fromEvent, ObjectUnsubscribedError, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IndexedDBResponse } from './models/indexedDB-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-start';
  internetStatus: boolean = false;

  constructor(
    private service: AuthService,
    private snackBar: MatSnackBar,
    private storeService: StoreService,
    private http: HttpClient,
    private handler: HttpHandler,
    private transformService:HttpTransformService,
    private dbService:NgxIndexedDBService
  ) {
    this.http=new HttpClient(handler);
  }

  ngOnInit() {
    this.checkInternetConnection();
    this.service.onInit();
    
  }
  checkInternetConnection() {
    fromEvent(window, 'online')
      .pipe(map((event: any) => event.target.value))
      .subscribe((res) => {
        this.snackBar.open('You are online', 'X', {
          duration: 3000,
        });
        //handle requests
        /*
        if (this.storeService.getRequests().length != 0) {
          this.storeService.getRequests().forEach((req) => {
           const newReq=this.deepCopy(req); 
           this.http.request(req).subscribe(res=>{
              console.log(res);
            })
          });
        }*/
        this.getRequestObjects().subscribe((res)=>{
          res.forEach((x)=>{
            const newReq=this.transformService.objectToRequest(x.object);
            this.http.request(newReq).subscribe((res)=>{
            })
          })
         this.dbService.clear('requestStore').subscribe(res=>{
         })
        })
       
      });
    fromEvent(window, 'offline')
      .pipe(map((event: any) => event.target.value))
      .subscribe((res) => {
        this.snackBar.open('You are offline', 'X', {
          duration: 3000,
        });
      });
  }

  deepCopy(request: HttpRequest<any>): HttpRequest<any> {
    let string=JSON.stringify(this.transformService.requestToObject(request));
    const object:HttpRequestObject=JSON.parse(string);
    return this.transformService.objectToRequest(object);
    
  }

  getRequestObjects():Observable<Array<IndexedDBResponse>>{

    return this.dbService.getAll('requestStore').pipe(
      map((res)=>{
        return res as Array<IndexedDBResponse> ;
      })
    )

  }




 
}




