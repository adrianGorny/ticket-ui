import * as fromSearch from './search.actions';

describe('loadSearchs', () => {
  it('should return an action', () => {
    expect(fromSearch.loadSearchs().type).toBe('[Search] Load Searchs');
  });
});
