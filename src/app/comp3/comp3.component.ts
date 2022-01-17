import { Component, OnInit } from '@angular/core';
import { ComponentI } from '../glavna/glavna.component';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit,ComponentI {

  constructor() { }
   correct=false;
  ngOnInit(): void {
  }
  onClick() {
    
    this.correct=!this.correct;
    console.log("Child3 clicked")
  }

}
