import { AuthService, } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, mergeMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.authService.checkToken()==false){
        this.router.navigate(['/login']);
        return of(false);
      }

      
    if(this.authService.checkUserCredentials()==false){
      return this.authService.getLoggedUser().pipe(
        map(()=>{
          return true;
        })
      )
    }
     return of(true);
 
 
 
      /*
     return this.aut/*hService.userAuthorized().pipe(
        mergeMap((token)=>{
          if(token){
            return this.authService.getLoggedUser().pipe(
              mergeMap((user)=>{
                if(user!=null){
                  return of(true);              
                  }else{
                    return of(false);
                  }
              })
            )
          }else{
            return of(false);
          }
        })
      )*/
     
     /* if(!this.authService.checkToken()){
        this.router.navigate(['/login']);

        return of(false);
      }
   return this.authService.getLoggedUser().pipe(
     mergeMap((user)=>{
      if(user!=null){
        return of(true);
      }else{
        this.router.navigate(['/login']);
        return of(false);
      }
     })
   )*/
  }

  
}
