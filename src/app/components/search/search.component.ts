import { Component } from '@angular/core';
import { PromoCodeStore } from 'src/app/store/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = ''
  constructor(private promoCodeStore: PromoCodeStore,) {

  }

  search() {
    this.promoCodeStore.setSearchValue(this.searchValue);
  }
}
