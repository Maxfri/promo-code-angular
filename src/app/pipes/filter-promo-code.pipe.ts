import { Pipe, PipeTransform } from '@angular/core';
import { IPromoCode } from '../models/promo-code';

@Pipe({
  name: 'filterPromoCode'
})
export class FilterPromoCodePipe implements PipeTransform {

  transform(promoCodes: IPromoCode[], search: string): IPromoCode[] {
    if (search.length === 0) return promoCodes;
    return promoCodes.filter((promoCode) => promoCode.title.toLowerCase().includes(search.toLowerCase()));
  }
}
