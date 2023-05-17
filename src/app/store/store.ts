import { Injectable } from '@angular/core';
import { observable, action } from 'mobx-angular';
import { IPromoCode } from '../models/promo-code';
import { BehaviorSubject, Observable } from 'rxjs';
import { mockData } from 'src/app/data/promo-codes';

@Injectable({ providedIn: 'root' })
export class PromoCodeStore {
  @observable promoCodes: IPromoCode[] = mockData;
  private promoCodesSubject: BehaviorSubject<IPromoCode[]> = new BehaviorSubject<IPromoCode[]>(mockData);

  getPromoCodesObservable(): Observable<IPromoCode[]> {
    return this.promoCodesSubject.asObservable();
  }

  @action addPromoCode(promoCode: IPromoCode) {
    this.promoCodes.push(promoCode);
    this.promoCodesSubject.next(this.promoCodes);
  }

  @action removePromoCode(promoCodeId: string) {
    this.promoCodes = this.promoCodes.filter(code => code.id !== promoCodeId);
    this.promoCodesSubject.next(this.promoCodes);
  }
}