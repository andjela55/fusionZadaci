import { Pipe } from '@angular/core';
@Pipe({name:'upperCasePipe'})
export class UpperCasePipe{
    transform(value:string):string{
        return value[0].toUpperCase() + value.substr(1).toLowerCase();
    }

}