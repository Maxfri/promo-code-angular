import { Component } from '@angular/core';
import { IPromocode } from 'src/app/models/promo-code';
import { PromocodeService } from 'src/app/services/promocode.service';
import { promocodes } from '../../data/promo-codes';

@Component({
  selector: 'app-promocodes-page',
  templateUrl: './promocodes-page.component.html',
  styleUrls: ['./promocodes-page.component.scss'],
})
export class PromocodesPageComponent {
  loading = false;
  items: IPromocode[] = promocodes;

  constructor(public promocodeService: PromocodeService) {}
}
