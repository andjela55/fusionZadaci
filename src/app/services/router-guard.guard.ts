import { Injectable, HostListener } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CommonComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  canLogout:()=> Observable<boolean>;
}
@Injectable({
  providedIn: 'root'
})
export class RouterGuardGuard implements CanDeactivate<CommonComponent> {
  canDeactivate(component:CommonComponent) {
    return component.canDeactivate ? component.canDeactivate():true;
  }
 
 
}
