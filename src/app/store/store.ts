import { Injectable } from '@angular/core';
import { makeObservable, observable, action, makeAutoObservable } from 'mobx';

import { IPromoCode } from '../models/promo-code';
import { PromoCodeService } from '../services/promo-code.service';
import { FilterType } from '../models/filter';

@Injectable({ providedIn: 'root' })
export class PromoCodeStore {
  promoCodes: IPromoCode[] = [];
  search: string = '';
  filterType: FilterType = FilterType.All;

  constructor(private promoCodeService: PromoCodeService) {
    makeAutoObservable(this);
  }

  getPromoCodes() {
    return this.promoCodes;
  }

  @action setFilterType(filterType: FilterType) {
    this.filterType = filterType;
  }

  getFilterType(): FilterType {
    return this.filterType;
  }

  @action setSearchValue(value: string) {
    this.search = value;
  }

  getSearchValue() {
    return this.search;
  }

}