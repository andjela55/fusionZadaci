import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../page-material/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';

  private _user = new BehaviorSubject<UserResponse>(null as any);
  private _currentUserExists = false;

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserResponse> {
    return this._user.asObservable();
  }



  getCurrentUserExists(): boolean {
    return this._user.value!=null;
  }

  setCredentials(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }
  isUserLoggedIn(): boolean {
    if (this.token) {
      return true;
    }
    return false;
  }

  getToken() {
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

  onInit() {
    let val = localStorage.getItem('token');
    if (val != null) {
      this.token = val;
    }
  }
}
export class UserResponse {
  Data!: UserData;
}
export class UserData {
  ClientName: string = '';
  UserName: string = '';
}
