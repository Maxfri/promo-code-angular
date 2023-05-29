import { Injectable } from '@angular/core';
import { makeObservable, observable, action } from 'mobx';

import { IPromoCode } from '../models/promo-code';
import { PromoCodeService } from '../services/promo-code.service';

@Injectable({ providedIn: 'root' })
export class PromoCodeStore {
  promoCodes: IPromoCode[] = [];

  constructor(private promoCodeService: PromoCodeService) {
    makeObservable(this, {
      promoCodes: observable,
      fetchPromoCodes: action,
      createPromoCode: action,
      updatePromoCode: action,
      deletePromoCode: action,
    });
  }

  async fetchPromoCodes() {
    await this.promoCodeService.fetchPromoCodes();
    this.promoCodes = this.promoCodeService.promoCodes;
  }

  async createPromoCode(promoCode: IPromoCode) {
    await this.promoCodeService.createPromoCode(promoCode);
    await this.fetchPromoCodes();
  }

  async updatePromoCode(promoCode: IPromoCode) {
    await this.promoCodeService.updatePromoCode(promoCode);
    await this.fetchPromoCodes();
  }

  async deletePromoCode(id: string) {
    await this.promoCodeService.deletePromoCode(id);
    await this.fetchPromoCodes();
  }
}