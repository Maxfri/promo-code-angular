import { Injectable } from '@angular/core';
import { IPromoCode } from '../models/promo-code';
import { action } from 'mobx-angular';
import { PromoCodeStore } from '../store/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  constructor(private promoCodeStore: PromoCodeStore) { }
  @action addPromoCode(promoCode: IPromoCode) {
    this.promoCodeStore.addPromoCode(promoCode);
  }

  @action editPromoCode(promoCode: IPromoCode) {
    this.promoCodeStore.editPromoCode(promoCode);
  }

  @action removePromoCode(promoCodeId: string) {
    this.promoCodeStore.removePromoCode(promoCodeId);
  }

  getAllPromoCodes(): Observable<IPromoCode[]> {
    return this.promoCodeStore.getAllPromoCodesObservable();
  }

  getPromoCodeById(promoCodeId: string): Observable<IPromoCode | undefined> {
    return this.promoCodeStore.getPromoCodeById(promoCodeId)
  }
}
