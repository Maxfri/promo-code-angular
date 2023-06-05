import { Injectable } from '@angular/core';
import { IPromoCode } from '../models/promo-code';
import { action, makeObservable, observable } from 'mobx';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PromoCodeStore } from '../store/store';
import { FilterType } from '../models/filter';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  promoCodes: IPromoCode[] = [];
  url = 'https://ng-promo-code-default-rtdb.europe-west1.firebasedatabase.app'

  constructor(private http: HttpClient, private promoCodeStore: PromoCodeStore) { }

  fetchPromoCodes() {
    const filterType = this.promoCodeStore.getFilterType();

    try {
      this.http.get<IPromoCode[]>(`${this.url}/promo-codes.json`)
        .pipe(
          map((responseData) => {
            const promoCodes: IPromoCode[] = [];
            for (const key in responseData) {
              promoCodes.push({ ...responseData[key], id: key });
            }
            return promoCodes;
          })
        ).subscribe((responseData) => {
          this.promoCodes = responseData;
          this.promoCodeStore.setPromoCodes(this.promoCodes);
        });
    } catch (error) {
      console.error('Error fetching promo codes:', error);
    }
  }

  fetchPromoCode(id: string) {
    try {
      const response = this.http.get<IPromoCode>(`${this.url}/promo-codes/${id}.json`);
      return response;
    } catch (error) {
      console.error('Error fetching promo codes:', error);
      return;
    }
  }

  createPromoCode(promoCode: IPromoCode) {
    try {
      this.http.post<IPromoCode>(`${this.url}/promo-codes.json`, promoCode)
        .subscribe((responseData) => {
          this.promoCodes.push(responseData);
          this.promoCodeStore.setPromoCodes(this.promoCodes);
        });
    } catch (error) {
      console.error('Error creating promo code:', error);
    }
  }

  updatePromoCode(promoCode: IPromoCode) {
    try {
      this.http.put<IPromoCode>(`${this.url}/promo-codes/${promoCode.id}.json`, promoCode).subscribe((responseData) => {
        return responseData;
      })
      const index = this.promoCodes.findIndex((promo) => promo.id === promoCode.id);
      if (index !== -1) {
        this.promoCodes[index] = promoCode;
      }
    } catch (error) {
      console.error('Error updating promo code:', error);
    }
  }

  deletePromoCode(id: string) {
    try {
      this.http.delete(`${this.url}/promo-codes/${id}.json`).pipe((responseData) => {
        console.log(responseData);
        return responseData;
      }).subscribe(() => {
        return;
      });
      this.promoCodes = this.promoCodes.filter((promo) => promo.id !== id);
      this.promoCodeStore.setPromoCodes(this.promoCodes);
    } catch (error) {
      console.error('Error deleting promo code:', error);
    }
  }
}
