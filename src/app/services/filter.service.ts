import * as moment from 'moment';
import { Observable, delay, map } from 'rxjs';
import { action } from 'mobx-angular';

import { Injectable } from '@angular/core';
import { PromoCodeStore } from '../store/store';
import { FilterType } from '../models/filter';
import { IPromoCode } from '../models/promo-code';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private promoCodeStore: PromoCodeStore) { }

  // @action setFilterType(filterType: FilterType) {
  //   this.promoCodeStore.setFilterType(filterType);
  // }

  // getFilterTypeObservable(): Observable<FilterType> {
  //   return this.promoCodeStore.getFilterType()
  // }

  // getFilteredPromoCodesObservable(): Observable<IPromoCode[]> {
  //   const filterType = this.promoCodeStore.getFilterType();
  //   return this.promoCodeStore.getAllPromoCodesObservable().pipe(
  //     map((promoCodes) => {
  //       if (filterType === FilterType.All) {
  //         return promoCodes;
  //       } else if (filterType === FilterType.Active) {
  //         const currentDay = moment().startOf('day');
  //         return promoCodes.filter((promoCode) => moment(promoCode.dateOfExpiry).startOf('day') >= currentDay);
  //       } else if (filterType === FilterType.Expired) {
  //         const currentDay = moment().startOf('day');
  //         return promoCodes.filter((promoCode) => moment(promoCode.dateOfExpiry).startOf('day') < currentDay);
  //       } else {
  //         return [];
  //       }
  //     })
  //   );
  // }
}
