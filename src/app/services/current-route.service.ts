import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonComponent } from './router-guard.guard';

@Injectable({
  providedIn: 'root'
})
export class CurrentRouteService {
  private currentRouteComponent:CommonComponent=null as any;

  constructor() { }
  public setCurrentRoute(component:CommonComponent){
    this.currentRouteComponent=component;
  }

  public canLogoutFromCurrentActiveRoute(): Observable<boolean>{
    return this.currentRouteComponent.canLogout();
  }

}
