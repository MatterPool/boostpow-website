import { Action } from '@ngrx/store';

export enum ApplicationActionTypes {
  showLoading = '[Application] Loading',
  hideLoading = '[Application] Loaded',
  hideLoadingAll = '[Application] Loaded All'
}

export class ShowLoadingAction implements Action {
  readonly type = ApplicationActionTypes.showLoading;
}

export class HideLoadingAction implements Action {
  readonly type = ApplicationActionTypes.hideLoading;
}
export class HideLoadingAllAction implements Action {
  readonly type = ApplicationActionTypes.hideLoadingAll;
}

export type ApplicationActionsUnion = ShowLoadingAction | HideLoadingAction | HideLoadingAllAction;
