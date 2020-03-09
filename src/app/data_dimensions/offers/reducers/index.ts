import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromOffers from '@offers/reducers/offers.reducer';
import * as fromRoot from '@app/reducers';

export interface OffersState {
  offers: fromOffers.State;
}

export const reducers: ActionReducerMap<OffersState> = {
  offers: fromOffers.reducer
};


export const offersTreeSelector = (state: fromRoot.State) => state.offers.offers;

export const getUploadStatus = createSelector(
  offersTreeSelector,
  (state: fromOffers.State) => state.uploadStatus
);

export const getSessionKey = createSelector(
  offersTreeSelector,
  (state: fromOffers.State) => state.sessionKey
);

export const getBoostJob = createSelector(
  offersTreeSelector,
  (state: fromOffers.State) => state.job
);

export const getBoostJobUtxos = createSelector(
  offersTreeSelector,
  (state: fromOffers.State) => state.jobUtxos
);
