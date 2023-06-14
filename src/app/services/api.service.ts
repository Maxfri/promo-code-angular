import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPromoCode } from '../models/promo-code';
import { IParams } from '../models/params';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://ng-promo-code-default-rtdb.europe-west1.firebasedatabase.app'

  constructor(private http: HttpClient) { }

  fetchPromoCodes(params: IParams): Observable<IPromoCode[]> {
    let queryParams = new HttpParams();

    if (params.pageSize) {
      queryParams = queryParams.set('pageSize', params.pageSize.toString());
    }

    if (params.page) {
      queryParams = queryParams.set('page', params.page.toString());
    }

    if (params.search) {
      queryParams = queryParams.set('search', params.search);
    }

    return this.http.get<IPromoCode[]>(`${this.apiUrl}/promo-codes.json`, {
      params: queryParams 
    });
  }

  fetchPromoCode(id: string): Observable<IPromoCode> {
    return this.http.get<IPromoCode>(`${this.apiUrl}/promo-codes/${id}.json`);
  }

  createPromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    return this.http.post<IPromoCode>(`${this.apiUrl}/promo-codes.json`, promoCode);
  }

  updatePromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    return this.http.put<IPromoCode>(`${this.apiUrl}/promo-codes/${promoCode.id}.json`, promoCode)
  }

  deletePromoCode(id: string) {
    return this.http.delete(`${this.apiUrl}/promo-codes/${id}.json`);
  }
}
