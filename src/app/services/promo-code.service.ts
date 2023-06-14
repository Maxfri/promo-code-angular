import { Injectable } from '@angular/core';
import { IPromoCode } from '../models/promo-code';
import { HttpParams } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';
import { IParams } from '../models/params';

const DELAY = 2000;
const PAGE_SIZE = 8;

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  promoCodes: IPromoCode[] = [];
  url = 'https://ng-promo-code-default-rtdb.europe-west1.firebasedatabase.app'

  constructor(
    private toastr: ToastrService,
    private api: ApiService
  ) { }

  fetchPromoCodes(params: IParams): Observable<IPromoCode[]> {
    return this.api.fetchPromoCodes(params)
      .pipe(
        map((responseData) => {
          const promoCodes: IPromoCode[] = [];
          for (const key in responseData) {
            promoCodes.push({ ...responseData[key], id: key });
          }
          return promoCodes.slice(0, 7);
        }),
        delay(DELAY),
      );
    // .subscribe((responseData) => {
    //   this.promoCodeStore.setPromoCodes(responseData);
    //   this.promoCodeStore.isLoading$.next(false);
    // });
  }

  // getNextBatch(currentPage: number): Observable<IPromoCode[]> {
  //   return this.api.fetchPromoCodes({

  //   }).pipe(
  //     map((responseData) => {
  //       const promoCodes: IPromoCode[] = [];
  //       for (const key in responseData) {
  //         promoCodes.push({ ...responseData[key], id: key });
  //       }
  //       const length = promoCodes.length;
  //       const endId = PAGE_SIZE * currentPage > length ? length - 1 : PAGE_SIZE * currentPage - 1;
  //       return promoCodes.slice(0, endId);
  //     }),
  //     delay(DELAY),
  //   )
  //   // .subscribe((responseData) => {
  //   //   this.promoCodes = responseData;
  //   //   this.promoCodeStore.setPromoCodes(this.promoCodes);
  //   //   this.promoCodeStore.isLoading$.next(false);
  //   // });
  // }

  fetchPromoCode(id: string): Observable<IPromoCode> {
    return this.api.fetchPromoCode(id)
      .pipe(
        delay(DELAY),
      );
  }

  createPromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    return this.api.createPromoCode(promoCode)
      .pipe(
        delay(DELAY),
      );
    // this.http.post<IPromoCode>(`${this.url}/promo-codes.json`, promoCode)
    //   .subscribe((responseData) => {
    //     this.promoCodes.push(responseData);
    //   });
  }

  updatePromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    return this.api.updatePromoCode(promoCode)
      .pipe(
        delay(DELAY),
      );
    // const index = this.promoCodes.findIndex((promo) => promo.id === promoCode.id);
    // if (index !== -1) {
    //   this.promoCodes[index] = promoCode;
    // }
  }

  deletePromoCode(id: string) {
    return this.api.deletePromoCode(id)
      .pipe(
        delay(DELAY),
      );
    // this.http.delete(`${this.url}/promo-codes/${id}.json`).pipe((responseData) => {
    //   return responseData;
    // }).subscribe(() => {
    //   return;
    // });
    // this.promoCodes = this.promoCodes.filter((promo) => promo.id !== id);
    // this.toastr.warning('Promo Code remove');
    // this.promoCodeStore.setPromoCodes(this.promoCodes);
  }
}
