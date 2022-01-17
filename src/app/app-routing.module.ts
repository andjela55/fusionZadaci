import { DropDownPageComponent } from './drop-down-page/drop-down-page.component';
import { LoginComponent } from './login/login.component';
import { PageMaterialComponent } from './page-material/page-material.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
{path:'module',
loadChildren: () => import('./test-mod/test-mod.module').then(x => x.TestModModule)
},
{path:'materials',component:PageMaterialComponent,canActivate:[AuthGuard]},
{path:'login',component:LoginComponent},
{path:'stores',component:DropDownPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
