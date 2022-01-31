import { Price } from './price.model';
export class Product {
    Id: string = '';
    Description:string='';
    Availability:number=-1;
    Manufacturer='';
    Name:string='';
    Price:Price=new Price();
  }