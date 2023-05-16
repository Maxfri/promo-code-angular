import { Component, OnInit } from '@angular/core';
import { mockData } from 'src/app/data/promo-codes';
import { IPromoCode } from 'src/app/models/promo-code';
import { PromoCodeService } from 'src/app/services/promo-code.service';

@Component({
  selector: 'app-promo-codes-page',
  templateUrl: './promo-codes-page.component.html',
  styleUrls: ['./promo-codes-page.component.scss'],
})
export class PromoCodesPageComponent implements OnInit {
  loading = false;
  items: IPromoCode[];

  constructor(public promoCodeService: PromoCodeService) { }

  ngOnInit() {
    this.items = [...mockData, ...this.promoCodeService.getPromoCodes()];
  }
}
