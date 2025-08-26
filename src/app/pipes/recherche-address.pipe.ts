import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheAddress'
})
export class RechercheAddressPipe implements PipeTransform {

  transform(value: any, term:any): any {
    if (term==null) {
      return value;
    }
    else {
      return value.filter((item:any) => (item.address.includes(term)));
    }
  }

}
