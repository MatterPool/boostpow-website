import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '@environments/environment';

import * as fromMain from '@main/reducers';
import * as fromApplication from '@application/reducers';

export interface State {
  main: fromMain.MainState;
  applicationInfo: fromApplication.ApplicationState;
}

export const reducers: any = {
  main: fromMain.reducers,
  applicationInfo: fromApplication.reducers
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
