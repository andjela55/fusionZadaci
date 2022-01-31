export class HttpRequestObject{
    url:string='';
    method:string='';
    body!:string;
    constructor(url:string,method:string,body:string){
        this.url=url;
        this.method=method;
        this.body=body;
    }
}