import { Station } from '@core/restapi/search';
import { SearchRestapiService } from '@core/restapi/search';
import { Actions } from '@ngrx/effects';
import { MemoizedSelector } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { BehaviorSubject } from 'rxjs';
import {
  addKeyAction,
  clearAction,
  loadAction,
  loadErrorAction,
  loadSuccessAction,
  removeKeyAction,
  SearchActions,
  setAvailableKeysAction
} from '../actions/search.actions';
import { SearchState } from '../reducers/search.reducer';
import { queryStringSelector } from '../selectors/search.selectors';
import { SearchEffects } from './search.effects';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

const state$ = new BehaviorSubject<SearchState>(null);
const getStations$ = new BehaviorSubject<Station[]>(null);

class SearchRestapiServiceSpy extends SearchRestapiService {
  getStations$ = jasmine.createSpy('getStations$').and.callFake(() => getStations$);
}

describe('search effects', () => {
  const MOCK_STATIONS: Station[] = [
    { stationName: 'Dartford', stationCode: 'DFD' },
    { stationName: 'Darton', stationCode: 'DRT' }
  ];
  const MOCK_QUERY = 'DA';
  const MOCK_STATE = {
    stations: [],
    selectedStation: null,
    loading: false,
    availableKeys: [],
    queryString: MOCK_QUERY,
    error: null
  };
  let actions: Actions<SearchActions>;
  let effects: SearchEffects;
  let mockStore: MockStore<SearchState>;
  let searchRestapiServiceSpy: SearchRestapiServiceSpy;
  let mockQuerySelector: MemoizedSelector<SearchState, string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    });
    mockStore = TestBed.inject(MockStore) as MockStore<SearchState>;
    searchRestapiServiceSpy = new SearchRestapiServiceSpy(null, null);
    mockQuerySelector = mockStore.overrideSelector(queryStringSelector, MOCK_QUERY);
  });

  it('should trigger loadSuccess with stations on load action', () => {
    const expected = cold('b', { b: loadSuccessAction({ stations: MOCK_STATIONS }) });
    actions = new Actions(hot('a', { a: loadAction({ queryString: MOCK_QUERY }) }));
    effects = new SearchEffects(actions, searchRestapiServiceSpy, mockStore);
    state$.next(MOCK_STATE);
    getStations$.next(MOCK_STATIONS);
    expect(effects.load$).toBeObservable(expected);
  });

  it('should set availableKeys on loadSuccess action', () => {
    const availableKeys = ['R'];
    const expected = cold('b', { b: setAvailableKeysAction({ availableKeys }) });
    actions = new Actions(
      hot('a', { a: loadSuccessAction({ stations: MOCK_STATIONS }) })
    );
    effects = new SearchEffects(actions, searchRestapiServiceSpy, mockStore);
    state$.next(MOCK_STATE);
    expect(effects.loadSuccess$).toBeObservable(expected);
  });

  it('should trigger load on key added to query', () => {
    const expected = cold('b', { b: loadAction({ queryString: MOCK_QUERY + 'R' }) });
    actions = new Actions(hot('a', { a: addKeyAction({ key: 'R' }) }));
    effects = new SearchEffects(actions, searchRestapiServiceSpy, mockStore);
    state$.next(MOCK_STATE);
    expect(effects.addKey$).toBeObservable(expected);
  });

  it('should trigger load on key removed from query', () => {
    const expected = cold('b', { b: loadAction({ queryString: 'D' }) });
    actions = new Actions(hot('a', { a: removeKeyAction() }));
    effects = new SearchEffects(actions, searchRestapiServiceSpy, mockStore);
    state$.next(MOCK_STATE);
    expect(effects.removeKey$).toBeObservable(expected);
  });

  it('should trigger clear on key removed and empty query', () => {
    mockQuerySelector.setResult('D');
    const expected = cold('b', { b: clearAction() });
    actions = new Actions(hot('a', { a: removeKeyAction() }));
    effects = new SearchEffects(actions, searchRestapiServiceSpy, mockStore);
    state$.next(MOCK_STATE);
    expect(effects.removeKey$).toBeObservable(expected);
  });

  it('should trigger load error action on load failure', () => {
    const error = 'error';
    const expected = cold('b', { b: loadErrorAction({ error }) });
    actions = new Actions(hot('a', { a: loadAction({ queryString: MOCK_QUERY }) }));
    effects = new SearchEffects(actions, searchRestapiServiceSpy, mockStore);
    state$.next(MOCK_STATE);
    getStations$.error({ message: error });
    expect(effects.load$).toBeObservable(expected);
  });
});
