import { Component, OnInit } from '@angular/core';
import { Observable, concat, takeUntil } from 'rxjs';
import { IPromoCode } from 'src/app/models/promo-code';
import { FilterService } from 'src/app/services/filter.service';
import { PromoCodeService } from 'src/app/services/promo-code.service';
import { concatMap, scan } from 'rxjs/operators';
import { PromoCodeStore } from 'src/app/store/store';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit {
  // promoCodes$: Observable<IPromoCode[]>;
  promoCodes: IPromoCode[] = [];
  startIndex = 0;
  size = 8;
  searchValue = ''

  constructor(public promoCodeStore: PromoCodeStore, private filterService: FilterService) { }

  ngOnInit() {
    this.promoCodeStore.getAllPromoCodesObservable().subscribe((promoCodes) => {
      this.promoCodes = promoCodes;
    })
  }

  loadMore() {

  }


}
