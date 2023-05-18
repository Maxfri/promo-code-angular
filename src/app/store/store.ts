import { Injectable } from '@angular/core';
import { observable, action } from 'mobx-angular';
import * as moment from 'moment';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { IPromoCode } from '../models/promo-code';
import { mockData } from 'src/app/data/promo-codes';
import { FilterType } from '../models/filter';

@Injectable({ providedIn: 'root' })
export class PromoCodeStore {
  @observable promoCodes: IPromoCode[] = mockData;
  private promoCodesSubject: BehaviorSubject<IPromoCode[]> = new BehaviorSubject<IPromoCode[]>(mockData);

  @observable filterType: FilterType = FilterType.All;
  private filterTypeSubject: BehaviorSubject<FilterType> = new BehaviorSubject<FilterType>(FilterType.All);

  getAllPromoCodesObservable(): Observable<IPromoCode[]> {
    return this.promoCodesSubject.asObservable();
  }

  getPromoCodeById(promoCodeId: string): Observable<IPromoCode | undefined> {
    return this.promoCodesSubject.asObservable().pipe(
      map((promoCodes) => promoCodes.find((promoCode) => promoCode.id === promoCodeId))
    );
  }

  getFilteredPromoCodes(): Observable<IPromoCode[]> {
    return this.promoCodesSubject.asObservable().pipe(
      map((promoCodes) => {
        if (this.filterType === FilterType.All) {
          return promoCodes;
        } else if (this.filterType === FilterType.Active) {
          const currentDay = moment().startOf('day');
          return promoCodes.filter((promoCode) => moment(promoCode.dateOfExpiry).startOf('day') >= currentDay);
        } else if (this.filterType === FilterType.Expired) {
          const currentDay = moment().startOf('day');
          return promoCodes.filter((promoCode) => moment(promoCode.dateOfExpiry).startOf('day') < currentDay);
        } else {
          return [];
        }
      })
    );
  }

  getFilterTypeObservable(): Observable<FilterType> {
    return this.filterTypeSubject.asObservable();
  }

  @action setFilterType(type: FilterType) {
    this.filterType = type;
    this.filterTypeSubject.next(this.filterType);
  }

  @action addPromoCode(promoCode: IPromoCode) {
    this.promoCodes.push(promoCode);
    this.promoCodesSubject.next(this.promoCodes);
  }

  @action removePromoCode(promoCodeId: string) {
    this.promoCodes = this.promoCodes.filter(code => code.id !== promoCodeId);
    this.promoCodesSubject.next(this.promoCodes);
  }

  @action editPromoCode(promoCode: IPromoCode) {
    const index = this.promoCodes.findIndex((code) => code.id === promoCode.id);
    if (index !== -1) {
      this.promoCodes[index] = promoCode;
      this.promoCodesSubject.next(this.promoCodes);
    }
  }
}