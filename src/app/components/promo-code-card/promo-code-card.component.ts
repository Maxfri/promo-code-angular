import { Component, Input } from '@angular/core';
import { IPromocode } from 'src/app/models/promo-code';

@Component({
  selector: 'app-promo-code-card',
  templateUrl: './promo-code-card.component.html',
  styleUrls: ['./promo-code-card.component.scss'],
})
export class PromoCodeCardComponent {
  @Input() item: IPromocode;

}
