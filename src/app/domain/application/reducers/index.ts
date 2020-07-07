import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromApplication from '@application/reducers/application';
import * as fromRoot from '@app/reducers';
import { Application } from '@application/models/application.interface';

export interface ApplicationState {
  application: fromApplication.State;
}

export interface State extends fromRoot.State {
  applicationInfo: ApplicationState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  application: fromApplication.reducer
};

export const showLoading = (state: State) => {
  // tslint:disable:curly
  if (!state.applicationInfo) {
    return false;
  }

  if (!state.applicationInfo.application) {
    return false;
  }
  // tslint:enable:curly
  return state.applicationInfo.application.loading.active;
};
