import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comp2Routingmodule } from '../test-mod/test-mod-routing.module';
import { Comp2Component } from '../comp2/comp2.component';
import { TestModModule } from '../test-mod/test-mod.module';



@NgModule({
  declarations: [Comp2Component],
  imports: [
    CommonModule,
    TestModModule
  ],
})
export class GlavnaRoutingModule { }
