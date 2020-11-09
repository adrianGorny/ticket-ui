import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSearch from '../reducers/search.reducer';

export const featureSearchStateSelector = createFeatureSelector<fromSearch.SearchState>(
  fromSearch.searchFeatureKey
);
export const selectedStationSelector = createSelector(
  featureSearchStateSelector,
  s => s.selectedStation
);
export const queryStringSelector = createSelector(featureSearchStateSelector, s => s.queryString);
