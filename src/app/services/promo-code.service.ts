import { Injectable } from '@angular/core';
import { IPromoCode } from '../models/promo-code';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, map } from 'rxjs';
import { PromoCodeStore } from '../store/store';
import { ToastrService } from 'ngx-toastr';

const DELAY = 2000;
const PAGE_SIZE = 8;

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  promoCodes: IPromoCode[] = [];
  url = 'https://ng-promo-code-default-rtdb.europe-west1.firebasedatabase.app'

  constructor(
    private http: HttpClient,
    private promoCodeStore: PromoCodeStore,
    private toastr: ToastrService
  ) { }

  fetchPromoCodes() {
    try {
      this.http.get<IPromoCode[]>(`${this.url}/promo-codes.json`)
        .pipe(
          map((responseData) => {
            const promoCodes: IPromoCode[] = [];
            this.promoCodeStore.isLoading$.next(true);
            for (const key in responseData) {
              promoCodes.push({ ...responseData[key], id: key });
            }
            return promoCodes.slice(0, 7);
          }),
          delay(DELAY),
        ).subscribe((responseData) => {
          this.promoCodes = responseData;
          this.promoCodeStore.setPromoCodes(this.promoCodes);
          this.promoCodeStore.isLoading$.next(false);
        });
    } catch (error) {
      console.error('Error fetching promo codes:', error);
    }
  }

  getNextBatch(currentPage: number) {
    try {
      this.http.get<IPromoCode[]>(`${this.url}/promo-codes.json`)
        .pipe(
          map((responseData) => {
            const promoCodes: IPromoCode[] = [];
            this.promoCodeStore.isLoading$.next(true);
            for (const key in responseData) {
              promoCodes.push({ ...responseData[key], id: key });
            }
            const length = promoCodes.length;
            const endId = PAGE_SIZE * currentPage > length ? length - 1 : PAGE_SIZE * currentPage - 1;
            return promoCodes.slice(0, endId);
          }),
          delay(DELAY),
        ).subscribe((responseData) => {
          this.promoCodes = responseData;
          this.promoCodeStore.setPromoCodes(this.promoCodes);
          this.promoCodeStore.isLoading$.next(false);
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
        return responseData;
      }).subscribe(() => {
        return;
      });
      this.promoCodes = this.promoCodes.filter((promo) => promo.id !== id);
      this.toastr.warning('Promo Code remove');
      this.promoCodeStore.setPromoCodes(this.promoCodes);
    } catch (error) {
      console.error('Error deleting promo code:', error);
    }
  }
}
