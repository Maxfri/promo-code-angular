import { Injectable } from '@angular/core';
import { IPromoCode } from '../models/promo-code';
import { observable, action } from 'mobx-angular';
import { Observable, catchError, delay, retry, throwError, tap } from 'rxjs';
import { PromoCodeStore } from '../store/store';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  constructor(private promoCodeStore: PromoCodeStore) { }
  @action addPromoCode(promoCode: IPromoCode) {
    this.promoCodeStore.addPromoCode(promoCode);
  }

  @action removePromoCode(promoCode: IPromoCode) {
    this.promoCodeStore.removePromoCode(promoCode);
  }

  getPromoCodes(): IPromoCode[] {
    return this.promoCodeStore.promoCodes;
  }
}
