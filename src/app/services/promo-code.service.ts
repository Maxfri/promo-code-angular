import { Injectable } from '@angular/core';
import { IPromoCode } from '../models/promo-code';
import { action, makeObservable, observable } from 'mobx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  promoCodes: IPromoCode[] = [];
  url = 'http//:localhost:300/'

  constructor(private http: HttpClient) {
    makeObservable(this, {
      promoCodes: observable,
      fetchPromoCodes: action,
      createPromoCode: action,
      updatePromoCode: action,
      deletePromoCode: action,
    });
  }

  async fetchPromoCodes() {
    try {
      const response = await this.http.get<IPromoCode[]>(`/api/promo-codes`).toPromise();
      if (response) {
        this.promoCodes = response;
      }
    } catch (error) {
      console.error('Error fetching promo codes:', error);
    }
  }

  fetchPromoCode(id: string) {
    try {
      const response = this.http.get<IPromoCode>(`/api/promo-codes/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching promo codes:', error);
      return;
    }
  }

  async createPromoCode(promoCode: IPromoCode) {
    try {
      const response = await this.http.post<IPromoCode>('/api/promo-codes', promoCode).toPromise();
      if (response) {
        this.promoCodes.push(response);
      }
    } catch (error) {
      console.error('Error creating promo code:', error);
    }
  }

  async updatePromoCode(promoCode: IPromoCode) {
    try {
      await this.http.put(`/api/promo-codes/${promoCode.id}`, promoCode).toPromise();
      const index = this.promoCodes.findIndex((promo) => promo.id === promoCode.id);
      if (index !== -1) {
        this.promoCodes[index] = promoCode;
      }
    } catch (error) {
      console.error('Error updating promo code:', error);
    }
  }

  async deletePromoCode(id: string) {
    try {
      await this.http.delete(`/api/promo-codes/${id}`).toPromise();
      this.promoCodes = this.promoCodes.filter((promo) => promo.id !== id);
    } catch (error) {
      console.error('Error deleting promo code:', error);
    }
  }

    // getFilteredPromoCodesObservable(): Observable<IPromoCode[]> {
  //   const filterType = this.promoCodeStore.getFilterType();
  //   return this.promoCodeStore.getAllPromoCodesObservable().pipe(
  //     map((promoCodes) => {
  //       if (filterType === FilterType.All) {
  //         return promoCodes;
  //       } else if (filterType === FilterType.Active) {
  //         const currentDay = moment().startOf('day');
  //         return promoCodes.filter((promoCode) => moment(promoCode.dateOfExpiry).startOf('day') >= currentDay);
  //       } else if (filterType === FilterType.Expired) {
  //         const currentDay = moment().startOf('day');
  //         return promoCodes.filter((promoCode) => moment(promoCode.dateOfExpiry).startOf('day') < currentDay);
  //       } else {
  //         return [];
  //       }
  //     })
  //   );
  // }

}
