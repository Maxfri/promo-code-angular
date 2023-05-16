import { Injectable } from '@angular/core';
import { observable, action } from 'mobx-angular';
import { IPromoCode } from '../models/promo-code';

@Injectable({ providedIn: 'root' })
export class PromoCodeStore {
  @observable promoCodes: IPromoCode[] = [];

  @action addPromoCode(promoCode: IPromoCode) {
    this.promoCodes.push(promoCode);
  }

  @action removePromoCode(promoCode: IPromoCode) {
    const index = this.promoCodes.indexOf(promoCode);
    if (index !== -1) {
      this.promoCodes.splice(index, 1);
    }
  }
}