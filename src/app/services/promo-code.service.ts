import { Injectable } from '@angular/core';
import { IPromoCode } from '../models/promo-code';
import { action } from 'mobx-angular';
import { PromoCodeStore } from '../store/store';
import { Observable, map } from 'rxjs';

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

  getAllPromoCodes(startIndex: number, size: number): Observable<IPromoCode[]> {
    return this.promoCodeStore.getAllPromoCodesObservable().pipe(
      map((promoCodes) => promoCodes.slice(startIndex, startIndex + size))
    );;
  }

  getPromoCodeById(promoCodeId: string): Observable<IPromoCode | undefined> {
    return this.promoCodeStore.getPromoCodeById(promoCodeId)
  }

}
