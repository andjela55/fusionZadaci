import { RouterGuardGuard } from './services/router-guard.guard';
import { PermissionGuard } from './services/permission.guard';
import { AuthorizedPageComponent } from './authorized-page/authorized-page.component';
import { DropDownPageComponent } from './drop-down-page/drop-down-page.component';
import { LoginComponent } from './login/login.component';
import { PageMaterialComponent } from './page-material/page-material.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  {
    path: '',
    component: AuthorizedPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'materials', component: PageMaterialComponent },
      { path: 'stores', component: DropDownPageComponent },
      { path: 'products', component: ProductsComponent, canActivate:[PermissionGuard],data:{permissions:['Blacklist']},canDeactivate:[RouterGuardGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
