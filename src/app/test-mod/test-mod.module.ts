import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comp2Component } from '../comp2/comp2.component';
import { Comp2Routingmodule } from './test-mod-routing.module';



@NgModule({
  declarations: [Comp2Component],
  imports: [
    CommonModule,
    Comp2Routingmodule
  ],
  exports: [Comp2Component] 

})
export class TestModModule { }
