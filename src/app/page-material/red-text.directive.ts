import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
    selector:'[redOnHover]'
})

export class RedOnHoverDirective{

    constructor(private element:ElementRef){
    }

    @HostListener('mouseenter') mouseover(){
        this.element.nativeElement.style.color='red';
    }
    @HostListener('mouseleave') mouseleave(){
        this.element.nativeElement.style.color='black';
    }

}