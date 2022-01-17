import { LoginService } from './../services/login.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!:string;
  password!:string;


  constructor(private loginService:LoginService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
   
    
  }

  onLogin(){
    this.loginService.login(this.username,this.password).subscribe(res=>{
      this.authService.setCredentials(res.access_token);
      this.router.navigate(["materials"]);
     /* if(this.authService.isUserLoggedIn()){
        this.authService.getLoggedUser().subscribe();
      }*/
    })
    
   

  }

}
