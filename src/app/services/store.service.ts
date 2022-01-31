import { Product } from './../models/product.model';
import { forkJoin, map, merge, mergeMap, Observable, of } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../models/store.model';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  products: Array<Product> = new Array<Product>();
  private ids: Array<number> = new Array<number>();

  private requestArray:Array<HttpRequest<any>>=new Array<HttpRequest<any>>();

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

  getShopsWithProducts(): Observable<Store[]> {
    return this.getStores().pipe(
      mergeMap((stores) => {
        let observableBatch = new Array<Observable<void>>();

        stores.forEach((store) => {
          let addProducts = this.getProducts(store.Id).pipe(
            map((products) => {
              store.products = products;
            })
          );
          observableBatch.push(addProducts);
        });

        return forkJoin(observableBatch).pipe(
          map(() => {
            return stores;
          })
        );
      })
    );
  }
  getFirstShopProducts(): Observable<Product[] | null> {
    return this.getStores().pipe(
      mergeMap((stores) => {
        console.log('STORE ID: ' + stores[0].Id);

        if (stores[0].Id % 2 === 0) {
          return this.getProducts(stores[0].Id).pipe(
            map((products) => {
              stores[0].products = products;
              return stores[0].products;
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getShopsWithProducts2(): Observable<Store[]> {
    return this.getStores().pipe(
      mergeMap((stores) => {
        let observableBatch = new Array<Observable<void>>();

        stores.forEach((store) => {
          let addProducts = this.getProducts(store.Id).pipe(
            map((products) => {
              store.products = products;
              //return store;
            })
          );
          observableBatch.push(addProducts);
        });

        return forkJoin(observableBatch).pipe(
          map(() => {
            return stores;
          })
        );
      })
    );
  }

  getProductsFromCertainShops(): Observable<Product[]> {
    return this.getStores().pipe(
      mergeMap((stores) => {
        let observableBatch = new Array<Observable<void>>();
        let newProducts = new Array<Product>();
        stores.forEach((store) => {
          if (store.Id % 2 != 0) {
            let funct = this.getProducts(store.Id).pipe(
              map((x) => {
                /* x.forEach(element => {
                  newProducts.push(element);
                });*/
                newProducts.push.apply(newProducts, x);
              })
            );
            observableBatch.push(funct);
          }
        });
        return forkJoin(observableBatch).pipe(
          map(() => {
            return newProducts;
          })
        );
      })
    );
  }
 
  getResponse() {
    let test ='{\r\n   \"Data\":[\r\n      {\r\n         \"Id\":1,\r\n         \"Campaigns\":[\r\n            {\r\n               \"Code\":\"PSZZstandards Shop\"\r\n            }\r\n         ],\r\n         \"Name\":\"HELOOO\",\r\n         \"OrderStateChangeTransactionName\":\"ProShoe Order State Change\",\r\n         \"CallCenter\":\"Order online or call us : +49 421 333 88-0\",\r\n         \"MainNavigationPath\":\"\\\\eCommerce\\\\ProShoe\\\\Navigation\",\r\n         \"MainCategoryPath\":\"\\\\eCommerce\\\\ProShoe\\\\Categories\",\r\n         \"MainBrandPath\":\"\\\\eCommerce\\\\ProShoe\\\\Brands\",\r\n         \"StreetAddress\":\"Wachtstr. 17-24, 28195 Bremen\",\r\n         \"Email\":\"info@procampaign.net\",\r\n         \"Phone\":\"+49 421 333 88-0\",\r\n         \"RecommendationDays\":30,\r\n         \"RecommendationProducts\":6\r\n      },\r\n      {\r\n         \"Id\":2,\r\n         \"Campaigns\":[\r\n            {\r\n               \"Code\":\"ONE SHOE Goes Green Campaign\"\r\n            }\r\n         ],\r\n         \"Name\":\"ONE SHOE\",\r\n         \"OrderStateChangeTransactionName\":\"ONE SHOE Order State Change\",\r\n         \"CallCenter\":\"Order online or call us : +49 421 333 88-0\",\r\n         \"MainNavigationPath\":\"\\\\eCommerce\\\\ONE SHOE\\\\Navigation\",\r\n         \"MainCategoryPath\":\"\\\\eCommerce\\\\ONE SHOE\\\\Categories\",\r\n         \"MainBrandPath\":\"\\\\eCommerce\\\\ONE SHOE\\\\Brands\",\r\n         \"StreetAddress\":\"Wachtstr. 17-24, 28195 Bremen\",\r\n         \"Email\":\"info@procampaign.net\",\r\n         \"Phone\":\"+49 421 333 88-0\",\r\n         \"RecommendationDays\":30,\r\n         \"RecommendationProducts\":6\r\n      }\r\n   ],\r\n   \"JobId\":\"10afb32b-dd12-43ff-ab30-f0339b3827b4\",\r\n   \"HttpStatusCode\":200,\r\n   \"HttpStatusMessage\":\"OK\",\r\n   \"StatusCode\":0,\r\n   \"StatusMessage\":\"Success\",\r\n   \"IsSuccessful\":true\r\n}';
    return JSON.parse(test);
  }
  saveRequest(request:HttpRequest<any>){
    this.requestArray.push(request);
  }
  getRequests():Array<HttpRequest<any>>{
    return this.requestArray;
  }
  clearRequests(){
    this.requestArray=new Array<HttpRequest<any>>();
  }
}

export interface Response<T> {
  Data: T[];
}
