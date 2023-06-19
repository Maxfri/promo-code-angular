import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { FilterType } from 'src/app/models/filter';
import { IParams } from 'src/app/models/params';
import { PromoCodeService } from 'src/app/services/promo-code.service';
import { PromoCodeStore } from 'src/app/store/store';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  filterOptions: FilterType[] = [FilterType.All, FilterType.Active, FilterType.Expired];
  selectedFilter: FilterType;

  private destroyed$ = new Subject();

  constructor(
    private promoCodeStore: PromoCodeStore,
    private promoCodeService: PromoCodeService
  ) { }

  ngOnInit(): void {
    this.selectedFilter = this.promoCodeStore.getFilterType();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onFilterChange(type: FilterType) {
    this.promoCodeStore.setFilterType(type);

    const params: IParams = {
      page: this.promoCodeStore.currentPage,
      status: type,
      search: this.promoCodeStore.search
    };
    
    this.promoCodeService.fetchPromoCodes(params)
      .pipe(
        takeUntil(this.destroyed$),
        map((promoCodes) => this.promoCodeStore.filteredByFilter(promoCodes, type)),
        map((promoCodes) => this.promoCodeStore.filteredBySearch(promoCodes)),
      )
      .subscribe((promoCodes) => {
        this.promoCodeStore.setPromoCodes(promoCodes);
      });
  }
}
