import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http:HttpClient) { }


  getStores():Observable<Store[]>{
   return this.http
   .get<Response<Store>>('https://bcd-api.procampaign.com/eCommerce/Shops')
   .pipe(map(res=>{
     return res.Data;
   }))
  }

  getProducts(shopId:string){
    return this.http
    .get<Response<Product>>(`https://bcd-api.procampaign.com/eCommerce/Shops/${shopId}/Products`)
    .pipe(map(res=>{
      console.log("RESULT "+res)
      return res.Data;
    }))

  }
}

export interface Response<T>{
  Data:T[];
}
export class Store{
  Id:number=-1;
  Name:string="";
  Phone:string="";
  StreetAddress:string="";

}
export class Product{
  Id:string="";
}
