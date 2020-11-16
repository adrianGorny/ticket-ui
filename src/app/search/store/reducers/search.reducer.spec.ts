import { Station } from '@core/restapi/search';
import {
  loadAction,
  loadErrorAction,
  loadSuccessAction,
  selectStationAction,
  setAvailableKeysAction
} from '@search/store/actions/search.actions';
import {
  initialState,
  searchReducer,
  SearchState
} from '@search/store/reducers/search.reducer';

const MOCK_STATION: Station = { stationName: 'Dartford', stationCode: 'DFD' };
const MOCK_QUERY = 'DA';

describe('Search reducer', () => {
  it('should have proper state on load action', () => {
    const state: SearchState = searchReducer(
      initialState,
      loadAction({ queryString: MOCK_QUERY })
    );
    expect(state.stations).toEqual([]);
    expect(state.selectedStation).toEqual(null);
    expect(state.loading).toBe(true);
    expect(state.queryString).toEqual(MOCK_QUERY);
    expect(state.error).toEqual(null);
  });

  it('should have proper state on load success action', () => {
    const state: SearchState = searchReducer(
      initialState,
      loadSuccessAction({ stations: [MOCK_STATION] })
    );
    expect(state.stations).toEqual([MOCK_STATION]);
    expect(state.selectedStation).toEqual(null);
    expect(state.loading).toBe(false);
    expect(state.queryString).toEqual('');
    expect(state.error).toEqual(null);
  });

  it('should have proper state on selectStation action', () => {
    const state: SearchState = searchReducer(
      initialState,
      selectStationAction({ station: MOCK_STATION })
    );
    expect(state.selectedStation).toEqual(MOCK_STATION);
    expect(state.loading).toBe(false);
  });

  it('should have proper state on setAvailableKeys action', () => {
    const state: SearchState = searchReducer(
      initialState,
      setAvailableKeysAction({ availableKeys: ['R'] })
    );
    expect(state.availableKeys).toEqual(['R']);
    expect(state.loading).toBe(false);
  });

  it('should have proper state on load error action', () => {
    const error = 'test';
    const state: SearchState = searchReducer(initialState, loadErrorAction({ error }));
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });
});
