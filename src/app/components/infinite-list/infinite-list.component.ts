import { Component, OnInit } from '@angular/core';
import { Observable, concat, takeUntil } from 'rxjs';
import { IPromoCode } from 'src/app/models/promo-code';
import { FilterService } from 'src/app/services/filter.service';
import { PromoCodeService } from 'src/app/services/promo-code.service';
import { concatMap, scan } from 'rxjs/operators';

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

  constructor(public promoCodeService: PromoCodeService, private filterService: FilterService) { }

  ngOnInit() {
    // this.promoCodes$ = this.promoCodeService.getAllPromoCodes(this.startIndex, this.size);
    this.loadMore();

    // this.filterService.getFilterTypeObservable().subscribe(() => {
    //   this.promoCodes$ = this.filterService.getFilteredPromoCodesObservable();
    // });
  }

  loadMore() {
    this.promoCodeService
      .getBatchPromoCodes(this.startIndex, this.size)
      .subscribe((codes: IPromoCode[]) => {
        this.promoCodes = this.promoCodes.concat(codes);
        this.startIndex += this.size;
      });
  }

  // onScroll() {
  //   this.startIndex += this.size;

  //   const nextBatch$ = this.promoCodeService.getAllPromoCodes(this.startIndex, this.size);
  //   nextBatch$.subscribe((observer) => console.log(observer));
  //   this.promoCodes$ = this.promoCodes$.pipe(
  //     scan((acc: IPromoCode[], curr: IPromoCode[]) => [...acc, ...curr], [] as IPromoCode[]),
  //     concatMap(() => nextBatch$)
  //   );
  // }
}
