import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../models/store.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-drop-down-page',
  templateUrl: './drop-down-page.component.html',
  styleUrls: ['./drop-down-page.component.css'],
})
export class DropDownPageComponent implements OnInit {
  stores: Array<Store> = new Array<Store>();

  selectedStore: Store = new Store();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getShopsWithProducts().subscribe((res) => {
      this.stores = res;
    });

  }

 
}
