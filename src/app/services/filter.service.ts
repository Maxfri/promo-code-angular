import { Injectable } from '@angular/core';
import { PromoCodeStore } from '../store/store';
import { FilterType } from '../models/filter';
import { Observable } from 'rxjs';
import { IPromoCode } from '../models/promo-code';
import { action } from 'mobx-angular';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private promoCodeStore: PromoCodeStore) { }

  @action setFilterType(filterType: FilterType) {
    this.promoCodeStore.setFilterType(filterType);
  }

  getFilterTypeObservable(): Observable<FilterType> {
    return this.promoCodeStore.getFilterTypeObservable();
  }

  getFilteredPromoCodesObservable(): Observable<IPromoCode[]> {
    return this.promoCodeStore.getFilteredPromoCodes();
  }
}
