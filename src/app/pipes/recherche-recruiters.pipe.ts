import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheRecruiters'
})
export class RechercheRecruitersPipe implements PipeTransform {

  transform(value: any, term:any): any {
    if (term==null) {
      return value;
    }
    else {
      return value.filter((item:any) => (item.firstName.includes(term)));
    }
  }

}
