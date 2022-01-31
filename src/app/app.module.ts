import { RouterGuardGuard } from './services/router-guard.guard';
import { FilterProducts } from './products/filter-products-pipe';
import { HrefDirective } from './page-material/href.directive';
import { RedOnHoverDirective } from './page-material/red-text.directive';
import { UpperCasePipe } from './page-material/upper-case-pipe';
import { HttpConfigInterceptorV} from './interceptor/httpconfig.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlavnaComponent } from './glavna/glavna.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestModModule } from './test-mod/test-mod.module';
import { Comp3Component } from './comp3/comp3.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageMaterialComponent } from './page-material/page-material.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { DropDownPageComponent } from './drop-down-page/drop-down-page.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductsComponent } from './products/products.component'
import { MatSortModule } from '@angular/material/sort';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { AuthorizedPageComponent } from './authorized-page/authorized-page.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';




const dbConfig: DBConfig = {
  name: 'indexedDB',
  version: 2,
  objectStoresMeta: [{
    store: 'requestStore',
    storeConfig: {keyPath: 'id', autoIncrement: true},
    storeSchema: [
      {name: 'requestObject', keypath: 'requestObject', options: { unique: false}},
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlavnaComponent,
    Comp3Component,
    PageMaterialComponent,
    UpperCasePipe,
    RedOnHoverDirective,
    HrefDirective,
    LoginComponent,
    DropDownPageComponent,
    ProductsComponent,
    FilterProducts,
    ProductDetailsComponent,
    AuthorizedPageComponent,
    EditDialogComponent,
    CustomDialogComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TestModModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    LayoutModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxIndexedDBModule.forRoot(dbConfig),


  
    
    
    
    
  ],
  exports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptorV,
      multi: true,
    },
 
    RouterGuardGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
