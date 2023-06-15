import { Injectable } from '@angular/core';
import { action, makeAutoObservable } from 'mobx';
import { IPromoCode } from '../models/promo-code';
import { FilterType } from '../models/filter';
import { BehaviorSubject, map, tap } from 'rxjs';
import * as moment from 'moment';
import { PromoCodeService } from '../services/promo-code.service';

@Injectable({ providedIn: 'root' })
export class PromoCodeStore {
  promoCodes$: BehaviorSubject<IPromoCode[]> = new BehaviorSubject<IPromoCode[]>([]);
  search: string = '';
  currentPage: number = 1;
  filterType: FilterType = FilterType.All;
  isModalOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentId: string | null = null;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    makeAutoObservable(this);
  }

  @action setPromoCodes(promoCodes: IPromoCode[]): void {
    this.promoCodes$.next(promoCodes);
  }

  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  setFilterType(filterType: FilterType) {
    this.filterType = filterType;
  }

  getFilterType(): FilterType {
    return this.filterType;
  }

  setSearchValue(value: string) {
    this.search = value;
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

  filteredByFilter(promoCodes: IPromoCode[], filterType: FilterType) {
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
  }

  filteredBySearch(promoCodes: IPromoCode[]) {
    return promoCodes.filter((promoCode) => promoCode.title.toLowerCase().includes(this.search.toLowerCase()));
  }
}
