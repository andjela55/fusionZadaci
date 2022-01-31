import { HttpRequestObject } from './../models/httpRequest.model';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpTransformService {

  constructor() { }


  requestToObject(httpRequest:HttpRequest<any>):HttpRequestObject{
    return new HttpRequestObject(httpRequest.url,httpRequest.method,httpRequest.body)
  }
  objectToRequest(object:HttpRequestObject):HttpRequest<any>{
    let req:HttpRequest<any>=new HttpRequest<any>(object.method,object.url,object.body);
    return req;
  }



}
