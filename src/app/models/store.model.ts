import { Product } from "./product.model";

export class Store {
    Id: number = -1;
    Name: string = '';
    Phone: string = '';
    StreetAddress: string = '';
    products: Array<Product> = new Array<Product>();
  }