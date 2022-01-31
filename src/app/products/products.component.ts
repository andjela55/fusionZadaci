import { EditDialogComponent } from './../dialogs/edit-dialog/edit-dialog.component';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  Observable,
  timer,
  Subject,
  share,
  takeUntil,
  fromEvent,
  throwIfEmpty,
  of,
  mergeMap,
} from 'rxjs';
import { Product } from './../models/product.model';
import { StoreService } from './../services/store.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Store } from '../models/store.model';
import { MatDialog } from '@angular/material/dialog';
import { CommonComponent } from '../services/router-guard.guard';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit , CommonComponent{
  displayedColumns = ['ID', 'Name', 'Manufacturer', 'Description', 'Price'];

  stores: Array<Store> = new Array<Store>();
  selectedStore: Store = new Store();
  selectedProduct: Product = null as any;
  editedProduct: Product = new Product();
  oldProduct: Product = null as any;

  dataSource: Array<Product> = new Array<Product>();
  message: string = '';

  selectedProductIndex: number = -1;
  products: Array<Product> = null as any;

  @ViewChild('yourElement') yourElement!: ElementRef;
  constructor(private storeService: StoreService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.storeService.getShopsWithProducts().subscribe((res) => {
      this.stores = res;
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.yourElement.nativeElement, 'input')
      .pipe(map((event: any) => event.target.value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        console.log(data);
        this.dataSource = data
          ? this.selectedStore.products.filter((product) =>
              product.Name.toLowerCase().includes(data.toLowerCase())
            )
          : this.selectedStore.products;
      });
  }

  onSelectStore(event: any) {
    this.dataSource = this.selectedStore.products;
  }

  onSelectProduct(product: Product): void {
   
      this.confirmEditing().subscribe((response) => {
        if (response == true) {
          this.selectedProduct = product;
          this.editedProduct = this.copy(product);
          return;
        } else {
          return;
        }
      });
    
  }
  getSelectedProduct(): Product {
    return this.selectedProduct;
  }

  saveProduct(): Observable<void> {
    return timer(500).pipe(
      map(() => {
        const index = this.selectedStore.products.findIndex(
          (x) => x.Id === this.selectedProduct.Id
        );
        this.dataSource[index] = this.copy(this.editedProduct);
        this.selectedProduct = null as any;
      })
    );
  }

  confirmEditing(): Observable<boolean> {

    if(this.selectedProduct==null){
      return of(true);
    }

    if(this.checkIfChanged()){
      const dialogRef = this.dialog.open(EditDialogComponent, {
        width: '250px',
      });
      dialogRef.componentInstance.onClickYesEvent
      return dialogRef.afterClosed().pipe(
        map((res) => {
          return res;
        })
      );
    }else{
      return of(false);
    }
  }
  onCancel() {
    if(this.checkIfChanged()==false){
      this.selectedProduct=null as any;
      return;
    }
    this.confirmEditing().subscribe((res) => {
      if (res == false) {
        this.selectedProduct = this.editedProduct;
      } else {
        this.selectedProduct = null as any;
      }
    });
  }

  onSave(): void {
    this.saveProduct().subscribe((res) => {});
  }

  copy(product: Product): Product {
    let newProduct: Product = JSON.parse(JSON.stringify(product));
    return newProduct;
  }

  filter(event: any) {
    const value = event.target.value;
    this.dataSource = value
      ? this.selectedStore.products.filter((product) =>
          product.Name.toLowerCase().includes(value.toLowerCase())
        )
      : this.selectedStore.products;
  }

  getCertainProducts(): void {
    this.storeService.getProductsFromCertainShops().subscribe((res) => {
      this.dataSource = res;
    });
  }

  checkIfChanged() {
    let oldProduct = JSON.stringify(this.selectedProduct);
    let editedProduct = JSON.stringify(this.editedProduct);

    if (oldProduct === editedProduct) {
      return false;
    }
    return true;
  }
  canDeactivate():Observable<boolean> | Promise<boolean> | boolean{
     return this.confirmEditing().pipe(
       map(res=>{
         return res;
       })
     )
  }
  canLogout():Observable<boolean>{
    return this.confirmEditing().pipe(
      mergeMap(res=>{
        if(res==true){
          return of(true);
        }else{
          return of(false)
        }
      })
    )
  }

}
