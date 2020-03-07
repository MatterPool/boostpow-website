import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '@environments/environment';

import * as fromOffers from '@offers/reducers';
import * as fromApplication from '@application/reducers';

export interface State {
  offers: fromOffers.OffersState;
  applicationInfo: fromApplication.ApplicationState;
}

export const reducers: any = {
  offers: fromOffers.reducers,
  applicationInfo: fromApplication.reducers
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
