import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Comp2Component } from "../comp2/comp2.component";

const routes: Routes=[
    {path:'',component:Comp2Component}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class Comp2Routingmodule{}