import {
  Directive,
  Input,
} from '@angular/core';

@Directive({
    selector: "[href]",
    host: {
      "(click)": "handleAnchorClick($event)"
    }
  })
  export class HrefDirective {
    @Input() href!: string;
  
    handleAnchorClick(event:any) {
      event.preventDefault();
      if (event.ctrlKey) {
        window.open(this.href, "_blank");
      }
    }
}
