import { HttpConfigInterceptorV } from './interceptor/httpconfig.interceptor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, map, Observable, Subscription } from 'rxjs';
import { BitcoinData, BitcoinModel } from './glavna/glavna.component';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  private _bitcoinValue = new BehaviorSubject<BitcoinData>(new BitcoinData("0","0","0"));
  private _requestNumber = 0;

  constructor(private http: HttpClient,
    private router: Router) {

  }

  get bitcoinValue():Observable<BitcoinData> {
    return this._bitcoinValue.asObservable();
  }


  getValue(){
    return this.http.get<BitcoinModel>('https://api.coindesk.com/v1/bpi/currentprice.json')
    .pipe(
      map((resData) => {
        console.log(resData)
        const bitData: BitcoinData = new BitcoinData("0", "0", "0");
        bitData.eur = resData.bpi.EUR.rate;
        bitData.gbp = resData.bpi.GBP.rate;
        bitData.usd = resData.bpi.USD.rate;

        this._bitcoinValue.next(bitData);
        console.log("CITAM BITCOIN")
        return bitData;
      })
    );
  }

 


}
