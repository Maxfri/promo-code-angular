import { Component, OnInit } from '@angular/core';
import { observable } from 'mobx-angular';
import { IPromoCode } from 'src/app/models/promo-code';
import { PromoCodeStore } from 'src/app/store/store';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit {
  @observable promoCodes: IPromoCode[] = [];

  constructor(private promoCodeStore: PromoCodeStore) { }

  ngOnInit(): void {
    
  }

  getPromoCodes() {
    this.promoCodeStore.getPromoCodes();
  }

  loadMore() {
    
  }

}
