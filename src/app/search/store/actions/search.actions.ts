import { Station } from '@core/restapi/search';
import { createAction, union, props } from '@ngrx/store';

export enum SearchActionTypes {
  AddKey = '[Search]:AddKey',
  RemoveKey = '[Search]:RemoveKey',
  Load = '[Search]:Load',
  Clear = '[Search]:Clear',
  SelectStation = '[Search]:SelectStation',
  LoadSuccess = '[Search]:LoadSuccess',
  LoadError = '[Search]:LoadError'
}

export const addKeyAction = createAction(SearchActionTypes.AddKey, props<{ key: string }>());
export const removeKeyAction = createAction(SearchActionTypes.RemoveKey);
export const loadAction = createAction(SearchActionTypes.Load, props<{ queryString: string }>());
export const clearAction = createAction(SearchActionTypes.Clear);
export const selectStationAction = createAction(
  SearchActionTypes.SelectStation,
  props<{ station: Station }>()
);
export const loadSuccessAction = createAction(
  SearchActionTypes.LoadSuccess,
  props<{ stations: Station[] }>()
);
export const loadErrorAction = createAction(
  SearchActionTypes.LoadError,
  props<{ error: string }>()
);

const actionUnion = union({
  addKeyAction,
  removeKeyAction,
  loadAction,
  clearAction,
  selectStationAction,
  loadSuccessAction,
  loadErrorAction
});

export type SearchActions = typeof actionUnion;
