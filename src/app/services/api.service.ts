import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPromoCode } from '../models/promo-code';
import { IParams } from '../models/params';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

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

    if (params.status) {
      queryParams = queryParams.set('status', params.status);
    }

    return this.http.get<IPromoCode[]>(`${environments.apiUrl}/promo-codes.json`, {
      params: queryParams 
    });
  }

  fetchPromoCode(id: string): Observable<IPromoCode> {
    return this.http.get<IPromoCode>(`${environments.apiUrl}/promo-codes/${id}.json`);
  }

  createPromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    return this.http.post<IPromoCode>(`${environments.apiUrl}/promo-codes.json`, promoCode);
  }

  updatePromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    return this.http.put<IPromoCode>(`${environments.apiUrl}/promo-codes/${promoCode.id}.json`, promoCode)
  }

  deletePromoCode(id: string) {
    return this.http.delete(`${environments.apiUrl}/promo-codes/${id}.json`);
  }
}
