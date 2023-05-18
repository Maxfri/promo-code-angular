import { Injectable } from '@angular/core';
import { observable, action } from 'mobx-angular';
import { IPromoCode } from '../models/promo-code';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { mockData } from 'src/app/data/promo-codes';

@Injectable({ providedIn: 'root' })
export class PromoCodeStore {
  @observable promoCodes: IPromoCode[] = mockData;
  private promoCodesSubject: BehaviorSubject<IPromoCode[]> = new BehaviorSubject<IPromoCode[]>(mockData);

  getAllPromoCodesObservable(): Observable<IPromoCode[]> {
    return this.promoCodesSubject.asObservable();
  }

  getPromoCodeById(promoCodeId: string): Observable<IPromoCode | undefined> {
    return this.promoCodesSubject.asObservable().pipe(
      map((promoCodes) => promoCodes.find((promoCode) => promoCode.id === promoCodeId))
    );
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