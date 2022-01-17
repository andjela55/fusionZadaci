import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http:HttpClient,private router:Router) { }
  
  login(username:string,password:string):Observable<ResponseModel>{


    let headers: HttpHeaders = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let requestOptions = { headers: headers };

    let body = `grant_type=password&password=${password}&username=${username}`

    return this.http.post<ResponseModel>('https://bcd-api.procampaign.com/auth/Token',body,requestOptions).
    pipe(
      map(
        res=>{
        const token:Data=new Data("0","0");          
          token.access_token=res.access_token;
          token.userName=res.userName;
          return res;
        }
       )
      
    );

  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }


 
}

export class ResponseModel{
  access_token:string="";
  userName:string="";
  statusCode:number=-1;
  message:string="";
}
export class Data {
  constructor(public access_token:string,public userName:string){}

}
