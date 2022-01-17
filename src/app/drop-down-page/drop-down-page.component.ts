import { Store, StoreService, Product } from './../services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-down-page',
  templateUrl: './drop-down-page.component.html',
  styleUrls: ['./drop-down-page.component.css']
})
export class DropDownPageComponent implements OnInit {

  stores:Array<Store> = new Array<Store>();
  products:Array<Product> = new Array<Product>();
  selectedStoreId!:number;
  ids:Array<number> = new Array<number>();

  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.storeService.getShopsWithProducts().subscribe(res=>{
      this.stores=res;
     
    })
 
   
  }
  chooseStore(value:number){
    console.log("vrednost:"+value);
    this.products=this.stores[value-1].products;
  }






}
