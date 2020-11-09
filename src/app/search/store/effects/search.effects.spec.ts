import { Station } from '@core/restapi/search';
import { SearchRestapiService } from '@core/restapi/search';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs';
import {
  loadAction,
  loadErrorAction,
  loadSuccessAction,
  SearchActions
} from '../actions/search.actions';
import { SearchState } from '../reducers/search.reducer';
import { SearchEffects } from './search.effects';

const state$ = new BehaviorSubject<SearchState>(null);
const getStations$ = new BehaviorSubject<Station[]>(null);

class SearchRestapiServiceSpy extends SearchRestapiService {
  getStations$ = jasmine.createSpy('getStations$').and.callFake(() => getStations$);
}

describe('search', () => {
  const state = {
    stations: [],
    selectedStation: null,
    loading: false,
    queryString: '',
    error: null
  };
  let actions: Actions<SearchActions>;
  let effects: SearchEffects;
  let storeSpy: Store<SearchState>;
  let searchRestapiServiceSpy: SearchRestapiServiceSpy;

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj<Store<SearchState>>('Store', ['select']);
    searchRestapiServiceSpy = new SearchRestapiServiceSpy(null, null);
  });

  it('should trigger load', () => {
    const stations = [];
    const expected = cold('b', { b: loadSuccessAction({ stations }) });
    actions = new Actions(hot('a', { a: loadAction({ queryString: 'XX' }) }));
    effects = new SearchEffects(actions, searchRestapiServiceSpy, storeSpy);

    state$.next(state);
    getStations$.next(stations);
    expect(effects.load$).toBeObservable(expected);
  });

  it('should trigger load error action on load failure', () => {
    const error = 'error';
    const expected = cold('b', { b: loadErrorAction({ error }) });
    actions = new Actions(hot('a', { a: loadAction({ queryString: 'XX' }) }));
    effects = new SearchEffects(actions, searchRestapiServiceSpy, storeSpy);

    state$.next(state);
    getStations$.error({ message: error });
    expect(effects.load$).toBeObservable(expected);
  });
});
