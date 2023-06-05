import { Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';
import { IPromoCode } from '../models/promo-code';
import { FilterType } from '../models/filter';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class PromoCodeStore {
  promoCodes: BehaviorSubject<IPromoCode[]> = new BehaviorSubject<IPromoCode[]>([]);
  search: string = '';
  filterType: FilterType = FilterType.All;
  isModalOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPromoCodes(promoCodes: IPromoCode[]) {
    this.promoCodes.next(promoCodes);
  }

  getPromoCodes(): Observable<IPromoCode[]> {
    return this.promoCodes.asObservable();
  }

  setFilterType(filterType: FilterType) {
    this.filterType = filterType;

    this.promoCodes.pipe(
      map((promoCodes) => {
        if (filterType === FilterType.All) {
          return promoCodes;
        } else if (filterType === FilterType.Active) {
          const currentDay = moment().startOf('day');
          return promoCodes.filter((promoCode) => moment(promoCode.dateOfExpiry).startOf('day') >= currentDay);
        } else if (filterType === FilterType.Expired) {
          const currentDay = moment().startOf('day');
          return promoCodes.filter((promoCode) => moment(promoCode.dateOfExpiry).startOf('day') < currentDay);
        } else {
          return [];
        }
      }),
      tap((filteredPromoCodes) => {
        this.setPromoCodes(filteredPromoCodes);
      })
    ).subscribe();
  }

  getFilterType(): FilterType {
    return this.filterType;
  }

  setSearchValue(value: string) {
    this.search = value;
    this.promoCodes.pipe(
      map((promoCodes) => {
        return promoCodes.filter((promoCode) => promoCode.title.toLowerCase().includes(this.search.toLowerCase()));
      }),
      tap((searchedPromoCodes) => {
        this.setPromoCodes(searchedPromoCodes);
      })
    ).subscribe();
  }

  getSearchValue(): string {
    return this.search;
  }

  openModal(promoCodeId: string) {
    this.currentId = promoCodeId;
    this.isModalOpen.next(true);
  }

  handleCloseModal() {
    this.currentId = null;
    this.isModalOpen.next(false);
  }
}
