import { Station } from '@core/restapi/search';
import { createReducer, on } from '@ngrx/store';
import {
  clearAction,
  loadAction,
  loadErrorAction,
  loadSuccessAction,
  SearchActions,
  selectStationAction,
  setAvailableKeysAction
} from '@search/store/actions/search.actions';

export const searchFeatureKey = 'searchFeature';

export interface SearchState {
  stations: Station[];
  selectedStation: Station;
  availableKeys: string[];
  loading: boolean;
  queryString: string;
  error: string;
}

export const initialState: SearchState = {
  stations: [],
  selectedStation: null,
  availableKeys: null,
  loading: false,
  queryString: '',
  error: null
};

export function searchReducer(searchState: SearchState, searchActions: SearchActions) {
  return createReducer(
    initialState,
    on(loadAction, (state, { queryString }) => ({
      ...state,
      loading: true,
      availableKeys: null,
      queryString
    })),
    on(clearAction, () => ({ ...initialState })),
    on(selectStationAction, (state, { station }) => ({
      ...state,
      selectedStation: station
    })),
    on(loadSuccessAction, (state, { stations }) => ({
      ...state,
      selectedStation: null,
      loading: false,
      stations
    })),
    on(setAvailableKeysAction, (state, { availableKeys }) => ({
      ...state,
      availableKeys
    })),
    on(loadErrorAction, (state, { error }) => ({ ...state, loading: false, error }))
  )(searchState, searchActions);
}
