import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPromoCode } from 'src/app/models/promo-code';
import { PromoCodeService } from 'src/app/services/promo-code.service';
import { PromoCodeStore } from 'src/app/store/store';
import { IParams } from "../../models/params";

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit, OnDestroy {
  promoCodes$: Observable<IPromoCode[]>;
  isModalOpen: boolean = false;
  isLoading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 8;

  private destroyed$ = new Subject();

  constructor(
    private promoCodeStore: PromoCodeStore,
    private promoCodeService: PromoCodeService,
  ) { }

  ngOnInit(): void {
    this.promoCodeStore.isModalOpen.subscribe((isVisible) => this.isModalOpen = isVisible);
    this.promoCodeStore.isLoading$.subscribe((isLoading) => this.isLoading = isLoading);
    this.loadData();
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
      const deletePromoCode = this.promoCodeService.deletePromoCode(this.promoCodeStore.currentId);
      deletePromoCode
        .pipe(
          takeUntil(this.destroyed$)
        )
        .subscribe()
      this.promoCodeStore.handleCloseModal();
    }
  }

  loadMore() {
    if (this.isLoading) {
      return;
    }
    this.currentPage++;
    this.loadData();
  }

  private loadData(): void {
    const params: IParams = {
      page: this.currentPage,
      pageSize: this.pageSize,
      status: this.promoCodeStore.filterType,
      search: this.promoCodeStore.search
    };

    this.promoCodes$ = this.promoCodeService.fetchPromoCodes(params);
    this.promoCodeStore.isLoading$.next(true);

    this.promoCodes$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((promoCodes) => {
        this.promoCodeStore.setPromoCodes(promoCodes);
        this.promoCodeStore.isLoading$.next(false);
      });
  }

}
