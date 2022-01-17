import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  products: Array<Product> = new Array<Product>();
  private ids: Array<number> = new Array<number>();

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http
      .get<Response<Store>>('https://bcd-api.procampaign.com/eCommerce/Shops')
      .pipe(
        map((res) => {
          return res.Data;
        })
      );
  }

  getProducts(shopId: number): Observable<Product[]> {
    return this.http
      .get<Response<Product>>(
        `https://bcd-api.procampaign.com/eCommerce/Shops/${shopId}/Products`
      )
      .pipe(
        map((res) => {
          return res.Data;
        })
      );
  }

  getShopsWithProducts():Observable<Store[]> {

    return this.getStores().pipe(
      mergeMap((stores)=>{

        let observableBatch=new Array<Observable<Store>>();

        stores.forEach(store=>{
          let callF= this.getProducts(store.Id).pipe(
            map(products=>{
              store.products=products;
              return store;
            })
            
          );
          observableBatch.push(callF);
        });

        return forkJoin(observableBatch).pipe(
          map((stores)=>{
            console.log("ZAVRSIO")
            return stores;
          })
        )
      
        
     

      
       
      })
    )

  }
}

export interface Response<T> {
  Data: T[];
}
export class Store {
  Id: number = -1;
  Name: string = '';
  Phone: string = '';
  StreetAddress: string = '';
  products: Array<Product> = new Array<Product>();
}
export class Product {
  Id: string = '';
  StoreId: number = -1;
}
