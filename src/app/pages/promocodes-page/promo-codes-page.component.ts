import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPromoCode } from 'src/app/models/promo-code';
import { PromoCodeService } from 'src/app/services/promo-code.service';

@Component({
  selector: 'app-promo-codes-page',
  templateUrl: './promo-codes-page.component.html',
  styleUrls: ['./promo-codes-page.component.scss'],
})
export class PromoCodesPageComponent implements OnInit {
  loading = false;
  promoCodes$: Observable<IPromoCode[]>;

  constructor(public promoCodeService: PromoCodeService) { }

  ngOnInit() {
    this.promoCodes$ = this.promoCodeService.getPromoCodes();
  }
}
