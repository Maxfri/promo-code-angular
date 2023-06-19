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

  fetchPromoCodes({ page = 1, pageSize = 8, search, status }: IParams): Observable<IPromoCode[]> {
    return this.api.fetchPromoCodes({ page, pageSize, search, status })
      .pipe(
        map((responseData) => {
          const promoCodes: IPromoCode[] = [];

          for (const key in responseData) {
            promoCodes.push({ ...responseData[key], id: key });
          }
          const length = promoCodes.length;
          const endId = PAGE_SIZE * page > length ? length - 1 : PAGE_SIZE * page - 1;
          return promoCodes.slice(0, endId);
        }),
        delay(DELAY),
      );
  }


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
  }

  updatePromoCode(promoCode: IPromoCode): Observable<IPromoCode> {
    return this.api.updatePromoCode(promoCode)
      .pipe(
        delay(DELAY),
      );
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
