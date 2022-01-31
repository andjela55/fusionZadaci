import { CurrentRouteService } from './../services/current-route.service';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from './../services/login.service';
import { AuthService, UserData } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn:boolean=false;
  user!:UserData;
  destroySub: Subject<boolean> = new Subject<boolean>();

  pageLink:string='';

  checkLogout:boolean=false;


  constructor(private authService:AuthService,private loginService:LoginService,private routeService:CurrentRouteService) { }

  ngOnInit(): void {
    
      this.authService.getUser().subscribe(res=>{
          this.user=res.Data;
      })
 
    }
    
  onLogout(){

   this.routeService.canLogoutFromCurrentActiveRoute().subscribe((res)=>{
     if(res==true){
       this.authService.logout();
     }
   })
   
   
  }
  
 
  
  
}
