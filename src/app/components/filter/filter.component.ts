import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterType } from 'src/app/models/filter';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterOptions: FilterType[] = [FilterType.All, FilterType.Active, FilterType.Expired];
  selectedFilter$: Observable<FilterType>;

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.selectedFilter$ = this.filterService.getFilterTypeObservable();
  }

  onFilterChange(type: FilterType) {
    this.filterService.setFilterType(type);
    this.filterService.getFilteredPromoCodesObservable();
  }
}
