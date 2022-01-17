import { Store, StoreService, Product } from './../services/store.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-drop-down-page',
  templateUrl: './drop-down-page.component.html',
  styleUrls: ['./drop-down-page.component.css']
})
export class DropDownPageComponent implements OnInit {

  stores:Store[]=[];
  products:Product[]=[];
  selectedStoreId!:string;

  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.storeService.getStores().subscribe(res=>{
      this.stores=res;
    });
   
  }

  chooseStore(event:any){

    if(this.selectedStoreId!=null){
      this.storeService.getProducts(this.selectedStoreId).subscribe(res=>{
        this.products=res;
      })
    }
  }



}
