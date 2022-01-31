import { Injectable } from '@angular/core';
import { HttpRequestObject } from '../models/httpRequest.model';

@Injectable({
  providedIn: 'root'
})
export class NgxIndexedDBServicssse {
 



configurationDB(){

  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }


  const indexedDB = window.indexedDB;
  const open = indexedDB.open("MyDatabase", 1);
  var db = open.result;
  var store;

  if(!db.objectStoreNames.contains("Requests")){
     store = db.createObjectStore("Requests");

  }

 // var index = store.createIndex("url", "url");
}

addRequest(requestObject:HttpRequestObject){
  const indexedDB = window.indexedDB;
  const open = indexedDB.open("MyDatabase", 1);
  var db = open.result;
    var tx = db.transaction("Requests", "readwrite");
    var store = tx.objectStore("Requests");
    var index = store.index("UrlIndex");

   // store.put({url:})

  
}





  
}