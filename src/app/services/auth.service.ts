import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token:string=null as any;
  private _user = new BehaviorSubject<UserResponse>(null as any);
  constructor(private http: HttpClient,private router:Router) {}



  onInit():void {
    let val = localStorage.getItem('token');
    if (val != null) {
      this.token = val;
   }
  }

 
  getUser(): Observable<UserResponse> {
    return this._user.asObservable();
  }

  checkUserCredentials(): boolean {
    console.log("vrednost"+this._user.value)
    return this._user.value!=null;
  }

  setCredentials(token: string):void {
    localStorage.setItem('token', token);
    this.token = token;
  }
  checkToken(): boolean {
    if (this.token) {
      return true;
    }
    return false;
  }
  getToken():string{
    return this.token;
  }


  getLoggedUser():Observable<UserResponse> {
    return this.http
      .get<UserResponse>('https://bcd-api.procampaign.com/auth/UserInfo')
      .pipe(
        map((res) => {
          this._user.next(res);
          return res;
        })
      );
  }


  checkUserPermission(permissionString:string[]):boolean{
    const result=this._user.value.Data.Privileges.some(r=>permissionString.includes(r))
    return result;
  }

  logout(){
    this.token=null as any;
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
  
}
export class UserResponse {
  Data!: UserData;
}
export class UserData {
  ClientName: string = '';
  UserName: string = '';
  Privileges:string[]=[];
}
