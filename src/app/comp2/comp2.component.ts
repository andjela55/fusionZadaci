import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ComponentI } from '../glavna/glavna.component';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements ComponentI {

  constructor() { }
  @Input() broj = 0;
  @Output() brojChange = new EventEmitter<number>()
  ngOnInit(): void {
  }

  onClick() {
    this.broj++;
    this.brojChange.emit(this.broj);
    console.log("Child2 clicked")

  }

}
