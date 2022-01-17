import { InterceptHttpService } from './../intercept-http.service';
import { HttpConfigInterceptorV } from './../interceptor/httpconfig.interceptor';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, map, Subject, Subscription, takeUntil } from 'rxjs';
import { BitcoinService } from '../bitcoin.service';
import { BpiModel } from '../models/bpi.model';
import { TimeModel } from '../models/time.model';

@Component({
  selector: 'app-glavna',
  templateUrl: './glavna.component.html',
  styleUrls: ['./glavna.component.css']
})
export class GlavnaComponent implements OnInit,OnDestroy {

  mainMessage = 'Poruka';
  poruka = "";
  message = "";
  inputBroj = 25;

  showChild1 = true;
  showChild2 = false;


  valueBit: BitcoinData = new BitcoinData("0", "0", "0");
  valueBit2: BitcoinData = new BitcoinData("0", "0", "0");
  valueBit3: BitcoinData = new BitcoinData("0", "0", "0");
  destroySub: Subject<boolean> = new Subject<boolean>();

  allRequests=0;
  pendingRequests=0;
  
  constructor(private http: HttpClient, private service: BitcoinService,private interceptService:InterceptHttpService) { }
  @ViewChild("andjela") comp!: ComponentI;
  ngOnInit(): void {
    
    this.interceptService.allRequests.subscribe(res=>{
      this.allRequests=res;
    })

    this.interceptService.pendingRequests.subscribe(res=>{
      this.pendingRequests=res;
    })
    
  }
  ngOnDestroy() {
    this.destroySub.next(true);
    this.destroySub.complete();
  }
  onClick(broj: number) {
    this.inputBroj = broj;
  }
  onChange1() {
    this.comp.onClick();

  }
  onChange2() {
    if (this.showChild1 == true) {
      this.showChild2 = true;
      this.showChild1 = false;
    } else {
      this.showChild2 = false;
      this.showChild1 = true;
    }
  }
  ngAfterViewInit() {
    console.log("Kontaktiram child");
  }

  getBitcoinValue() {

    interval(1000).pipe(takeUntil(this.destroySub)).subscribe(x => {
      this.service.getValue().subscribe(res => {
        this.valueBit=res;
       });
    })
    interval(2000).pipe(takeUntil(this.destroySub)).subscribe(x => {
      this.service.getValue().subscribe(res => {
        this.valueBit2=res;

       });
    })
    interval(3000).pipe(takeUntil(this.destroySub)).subscribe(x => {
      this.service.getValue().subscribe(res => {
        this.valueBit3=res;
       });
    })

  }
 



}

export interface ComponentI {

  onClick(): any;
}

export interface BitcoinModel {
  disclamer: string
  chartName: string
  time: TimeModel
  bpi: BpiModel

}
export class BitcoinData {

  constructor(public usd: string, public gbp: string, public eur: string) { }
}
