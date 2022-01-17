import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptHttpService {


  private pendingCount=0;
  private reqCount=0;
  
  private _pendingRequests = new BehaviorSubject<number>(0);
  private _allRequests=new BehaviorSubject<number>(0);

 
  get pendingRequests():Observable<number>{
      return this._pendingRequests.asObservable();
  }
  get allRequests():Observable<number> {
      return this._allRequests.asObservable();
  }
   setPendingRequests(){
    this.pendingCount++;
     this._pendingRequests.next(this.pendingCount);
     console.log("Pending req: "+this.pendingCount);
  }

   setAllRequests(){
     this.reqCount++;
     this._pendingRequests.next(this.reqCount);
     console.log("All req: "+this.reqCount);
  }
  removeFromAll(){
    this._pendingRequests.next(--this.reqCount);
  }

  constructor() { }
}
