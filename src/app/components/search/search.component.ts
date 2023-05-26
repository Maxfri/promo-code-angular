import { Component } from '@angular/core';
import { PromoCodeService } from 'src/app/services/promo-code.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = ''
  constructor(private promoCodeService: PromoCodeService,) {

  }

  search() {
    console.log(this.searchValue);
    
  }
}
