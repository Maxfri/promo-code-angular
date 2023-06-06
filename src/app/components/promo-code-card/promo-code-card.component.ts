import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { IPromoCode } from 'src/app/models/promo-code';
import { PromoCodeStore } from 'src/app/store/store';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-promo-code-card',
  templateUrl: './promo-code-card.component.html',
  styleUrls: ['./promo-code-card.component.scss'],
})
export class PromoCodeCardComponent implements OnChanges, OnInit {
  @Input() item: IPromoCode;
  isExpiry: boolean = false;

  constructor(
    private promoCodeStore: PromoCodeStore,
    private router: Router,
    private clipboard: Clipboard,
    private toastr: ToastrService
  ) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      this.checkExpiry();
    }
  }

  ngOnInit(): void {
  }

  formatDate(date: Date): string {
    return moment(date).format('DD.MM.YYYY');
  }

  editPromoCode(id: string) {
    this.router.navigate(['/promo-codes', id]);
  }

  handleOpenModal(currentId: string) {
    this.promoCodeStore.openModal(currentId);
  }

  handleCopyPromoCode() {
    this.clipboard.copy(this.item.promoCode);
    this.toastr.info('Promo Code copy to clipboard');
  }

  private checkExpiry() {
    const currentDay = moment().startOf('day');
    const dayOfExpiry = moment(this.item.dateOfExpiry).startOf('day');
    this.isExpiry = dayOfExpiry.isBefore(currentDay);
  }

}
