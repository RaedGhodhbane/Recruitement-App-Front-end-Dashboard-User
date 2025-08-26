import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheCandidacies'
})
export class RechercheCandidaciesPipe implements PipeTransform {

  transform(value: any, term:any): any {
    if (term==null) {
      return value;
    }
    else {
      return value.filter((item:any) => (item.offer.title.includes(term)));
    }
  }

}
