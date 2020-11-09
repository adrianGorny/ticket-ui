import { loadAction, loadErrorAction, loadSuccessAction } from '../actions/search.actions';
import { searchReducer, SearchState } from './search.reducer';

export const initialState: SearchState = {
  stations: [],
  selectedStation: null,
  loading: false,
  queryString: '',
  error: null
};
const testQuery = 'DAR';
const stations = [];

describe('Search reducer', () => {
  it('should have proper state on  load action', () => {
    const state: SearchState = searchReducer(initialState, loadAction({ queryString: testQuery }));
    expect(state.stations).toEqual([]);
    expect(state.selectedStation).toEqual(null);
    expect(state.loading).toBe(true);
    expect(state.queryString).toEqual(testQuery);
    expect(state.error).toEqual(null);
  });

  it('should have proper state on load success action', () => {
    const state: SearchState = searchReducer(initialState, loadSuccessAction({ stations }));
    expect(state.stations).toEqual([]);
    expect(state.selectedStation).toEqual(null);
    expect(state.loading).toBe(false);
    expect(state.queryString).toEqual('');
    expect(state.error).toEqual(null);
  });

  it('should have proper state on load error action', () => {
    const error = 'test';
    const state: SearchState = searchReducer(initialState, loadErrorAction({ error }));
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });
});
