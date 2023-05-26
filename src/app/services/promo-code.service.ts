import { Injectable } from '@angular/core';
import { IPromoCode } from '../models/promo-code';
import { action } from 'mobx-angular';
import { PromoCodeStore } from '../store/store';
import { Observable, delay, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  constructor(private promoCodeStore: PromoCodeStore, private http: HttpClient) { }

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

  getBatchPromoCodes(startIndex: number, size: number): Observable<IPromoCode[]> {
    return this.promoCodeStore.getAllPromoCodesObservable().pipe(
      map((promoCodes) => promoCodes.slice(startIndex, startIndex + size)), delay(2000)
    );
  }

  getPromoCodeById(promoCodeId: string): Observable<IPromoCode | undefined> {
    return this.promoCodeStore.getPromoCodeById(promoCodeId)
  }

  private apiUrl = 'https://api.example.com/promocodes'; // Замените на URL вашего бэкэнда



  getPromoCodes(): Observable<IPromoCode> {
    return this.http.get<IPromoCode>(this.apiUrl);
  }

  createPromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    return this.http.post<IPromoCode>(this.apiUrl, promoCode);
  }

  updatePromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    const url = `${this.apiUrl}/${promoCode.id}`;
    return this.http.put<IPromoCode>(url, promoCode);
  }

  deletePromoCode(promoCodeId: string): Observable<IPromoCode> {
    const url = `${this.apiUrl}/${promoCodeId}`;
    return this.http.delete<IPromoCode>(url);
  }

}
