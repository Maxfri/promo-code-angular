import { Injectable } from '@angular/core';
import { PromoCodeStore } from '../store/store';
import { action } from 'mobx-angular';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private promoCodeStore: PromoCodeStore) { }

  @action setSearchValue(value: string) {
    this.promoCodeStore.setSearchValue(value);
  }

  getSearchValue() {
    return this.promoCodeStore.getSearchValueObservable();
  }
}
