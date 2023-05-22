import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = ''
  constructor() {

  }

  search() {
    console.log(this.searchValue);
  }
}
