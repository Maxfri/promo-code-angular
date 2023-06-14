import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { observable } from 'mobx-angular';
import { IPromoCode } from 'src/app/models/promo-code';
import { PromoCodeService } from 'src/app/services/promo-code.service';
import { PromoCodeStore } from 'src/app/store/store';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit, OnDestroy {
  promoCodes$: Observable<IPromoCode[]> = [];
  isModalOpen: boolean = false;
  isLoading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 8;

  private destroyed$ = new Subject();

  constructor(
    private promoCodeStore: PromoCodeStore,
    private promoCodeService: PromoCodeService,
  ) {

  }

  ngOnInit(): void {
    this.promoCodeStore.isModalOpen.subscribe((isVisible) => this.isModalOpen = isVisible);
    this.promoCodeService.fetchPromoCodes();
    this.promoCodeStore.promoCodes$.subscribe((promoCodes: IPromoCode[]) => {
    });
    this.promoCodeStore.isLoading$.subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
    this.promoCodeService.getNextBatch(this.currentPage + 1);
    this.currentPage++;
  }

  private loadData(): void {
    this.promoCodes$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(

    )
  }

}
