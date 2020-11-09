import { clearAction } from './../actions/search.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRestapiService } from '@core/restapi/search';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  loadSuccessAction,
  loadErrorAction,
  SearchActionTypes,
  SearchActions,
  loadAction
} from '@search/store/actions/search.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { SearchState } from '../reducers/search.reducer';
import { queryStringSelector } from '../selectors/search.selectors';

@Injectable()
export class SearchEffects {
  @Effect()
  addKey$ = this.actions$.pipe(
    ofType(SearchActionTypes.AddKey),
    withLatestFrom(this.store.select(queryStringSelector)),
    map(([{ key }, queryString]) => loadAction({ queryString: `${queryString}${key}` }))
  );

  @Effect()
  removeKey$ = this.actions$.pipe(
    ofType(SearchActionTypes.RemoveKey),
    withLatestFrom(this.store.select(queryStringSelector)),
    filter(([_, queryString]) => !!queryString),
    map(([_, queryString]) => queryString.slice(0, -1)),
    map(queryString => (!!queryString ? loadAction({ queryString }) : clearAction()))
  );

  @Effect()
  load$ = this.actions$.pipe(
    ofType(SearchActionTypes.Load),
    switchMap(({ queryString }) =>
      this.searchRestapiService.getStations$(queryString).pipe(
        map(stations => loadSuccessAction({ stations })),
        catchError((error: HttpErrorResponse) => of(loadErrorAction({ error: error.message })))
      )
    )
  );

  constructor(
    private actions$: Actions<SearchActions>,
    private searchRestapiService: SearchRestapiService,
    private store: Store<SearchState>
  ) {}
}
