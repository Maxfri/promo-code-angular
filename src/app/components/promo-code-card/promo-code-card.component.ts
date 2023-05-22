import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { IPromoCode } from 'src/app/models/promo-code';
import { PromoCodeService } from 'src/app/services/promo-code.service';
@Component({
  selector: 'app-promo-code-card',
  templateUrl: './promo-code-card.component.html',
  styleUrls: ['./promo-code-card.component.scss'],
})
export class PromoCodeCardComponent implements OnChanges {
  @Input() item: IPromoCode;
  isExpiry: boolean = false;

  constructor(public promoCodeService: PromoCodeService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      this.checkExpiry();
    }
  }

  formatDate(date: Date): string {
    return moment(date).format('DD.MM.YYYY');
  }

  editPromoCode(id: string) {
    this.router.navigate(['/promo-codes', id]);
  }

  private checkExpiry() {
    const currentDay = moment().startOf('day');
    const dayOfExpiry = moment(this.item.dateOfExpiry).startOf('day');
    this.isExpiry = dayOfExpiry.isBefore(currentDay);
  }

}
