import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterType } from 'src/app/models/filter';
import { PromoCodeStore } from 'src/app/store/store';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterOptions: FilterType[] = [FilterType.All, FilterType.Active, FilterType.Expired];
  selectedFilter: FilterType;

  constructor(private promoCodeStore: PromoCodeStore) { }

  ngOnInit(): void {
    this.selectedFilter = this.promoCodeStore.getFilterType();
  }

  onFilterChange(type: FilterType) {
    this.promoCodeStore.setFilterType(type);
  }
}
