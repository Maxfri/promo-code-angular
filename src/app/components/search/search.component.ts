import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { IParams } from 'src/app/models/params';
import { PromoCodeService } from 'src/app/services/promo-code.service';
import { PromoCodeStore } from 'src/app/store/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  searchValue: string = ''

  private destroyed$ = new Subject();
  
  constructor(
    private promoCodeStore: PromoCodeStore,
    private promoCodeService: PromoCodeService
  ) { }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  search() {
    this.promoCodeStore.setSearchValue(this.searchValue);
    const params: IParams = {
      page: this.promoCodeStore.currentPage,
      status: this.promoCodeStore.filterType,
      search:this.searchValue
    };
    this.promoCodeService.fetchPromoCodes(params)
      .pipe(
        takeUntil(this.destroyed$),
        map((promoCodes) => this.promoCodeStore.filteredByFilter(promoCodes, this.promoCodeStore.filterType)),
        map((promoCodes) => this.promoCodeStore.filteredBySearch(promoCodes)),
      )
      .subscribe((promoCodes) => {
        this.promoCodeStore.setPromoCodes(promoCodes);
      });
  }
}
