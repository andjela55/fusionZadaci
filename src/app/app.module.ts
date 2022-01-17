import { HrefDirective } from './page-material/href.directive';
import { RedOnHoverDirective } from './page-material/red-text.directive';
import { UpperCasePipe } from './page-material/upper-case-pipe';
import { HttpConfigInterceptorV } from './interceptor/httpconfig.interceptor';
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
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { DropDownPageComponent } from './drop-down-page/drop-down-page.component';
import { MatSelectModule } from '@angular/material/select'
@NgModule({
  declarations: [
    AppComponent,
    GlavnaComponent,
    Comp3Component,
    PageMaterialComponent,
    UpperCasePipe,
    RedOnHoverDirective,
    HrefDirective,
    LoginComponent,
    DropDownPageComponent
  
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
    MatSelectModule
    
    
    
    
  ],
  exports: [
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptorV,
      multi: true,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
