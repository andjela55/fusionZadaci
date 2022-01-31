import { CurrentRouteService } from './../services/current-route.service';
import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../services/router-guard.guard';

@Component({
  selector: 'app-authorized-page',
  templateUrl: './authorized-page.component.html',
  styleUrls: ['./authorized-page.component.css']
})
export class AuthorizedPageComponent implements OnInit {

  constructor(private routeService:CurrentRouteService) { }

  ngOnInit(): void {
  }
  childActivated(currentRoute:CommonComponent){
    this.routeService.setCurrentRoute(currentRoute);
  }

}
