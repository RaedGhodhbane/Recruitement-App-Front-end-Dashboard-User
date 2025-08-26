import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheCandidatiesByCandidate'
})
export class RechercheCandidatiesByCandidatePipe implements PipeTransform {

  transform(value: any, term:any): any {
    if (term==null) {
      return value;
    }
    else {
      return value.filter((item:any) => (item.candidate.name.includes(term)));
    }
  }

}
