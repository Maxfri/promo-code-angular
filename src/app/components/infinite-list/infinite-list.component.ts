import { Component, OnInit } from '@angular/core';
import { observable } from 'mobx-angular';
import { IPromoCode } from 'src/app/models/promo-code';
import { PromoCodeService } from 'src/app/services/promo-code.service';
import { PromoCodeStore } from 'src/app/store/store';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit {
  @observable promoCodes: IPromoCode[] = [];
  isModalOpen: boolean = false;
  isLoading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 8;

  constructor(
    private promoCodeStore: PromoCodeStore,
    private promoCodeService: PromoCodeService,
  ) {

  }

  ngOnInit(): void {
    this.promoCodeStore.isModalOpen.subscribe((isVisible) => this.isModalOpen = isVisible);
    this.promoCodeService.fetchPromoCodes();
    this.promoCodeStore.promoCodes.subscribe((promoCodes: IPromoCode[]) => {
      this.promoCodes = promoCodes;
    });
  }

  handleCloseModal() {
    this.promoCodeStore.handleCloseModal();
  }

  removePromoCode() {
    if (this.promoCodeStore.currentId) {
      this.promoCodeService.deletePromoCode(this.promoCodeStore.currentId);
      this.promoCodeStore.handleCloseModal();
    }
  }

  loadMore() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.promoCodeService.getNextBatch(this.currentPage + 1);
    this.currentPage++;
    this.isLoading = false;
  }

}
