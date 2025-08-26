import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheMessages'
})
export class RechercheMessagesPipe implements PipeTransform {

  transform(value: any, term:any): any {
    if (term==null) {
      return value;
    }
    else {
      return value.filter((item:any) => (item.userReceive.name.includes(term)));
    }
  }

}
