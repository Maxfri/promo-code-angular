import { Injectable } from '@angular/core';
import { IPromocode } from '../models/promo-code';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromocodeService {
  promocodes: IPromocode[];

  constructor() {}

  create(product: IPromocode): void {
    console.log(product);
  }
}
