import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';
@Pipe({name:'filterProducts'})
export class FilterProducts implements PipeTransform{
    transform(products:Product[],value:string):Array<Product>{
      return value? products.filter(product => product.Name.includes(value)):products;
    }

}