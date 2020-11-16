import { Router } from '@angular/router';
import { Station } from '@core/restapi/search';
import { featureSearchStateSelector } from '@search/store/selectors/search.selectors';
import { Observable } from 'rxjs';
import * as fromSearch from '@search/store/actions/search.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SearchState } from '@search/store/reducers/search.reducer';
import { AppRoutes } from '@core/config/app-routes';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  state$: Observable<SearchState>;
  constructor(private store: Store<SearchState>, private router: Router) {}

  ngOnInit() {
    this.state$ = this.store.select(featureSearchStateSelector);
  }

  stationSelect(station: Station) {
    this.store.dispatch(fromSearch.selectStationAction({ station }));
  }

  keySelect(key: string) {
    this.store.dispatch(fromSearch.addKeyAction({ key }));
  }

  backspaceSelect() {
    this.store.dispatch(fromSearch.removeKeyAction());
  }

  clearQuery() {
    this.store.dispatch(fromSearch.clearAction());
  }

  navigateToNextPage(selectedStation: Station) {
    this.router.navigate([`/${AppRoutes.OVERVIEW}`, selectedStation.stationCode]);
  }
}
