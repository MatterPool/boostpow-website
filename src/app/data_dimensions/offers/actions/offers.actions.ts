import { Action } from '@ngrx/store';
import { UploadStatus } from '@offers/models/upload-status.interface';
import * as Boost from 'boostpow-js';

console.log('Boost', Boost);
export enum OffersActionTypes {
  RedirectAction = 'OffersActionTypes',
  GetStatus = 'Getstatus',
  GetStatusComplete = 'GetStatusComplete',
  SetSessionKey = 'SetSessionKey',
  GetBoostJob = 'GetBoostJob',
  GetBoostJobComplete = 'GetBoostJobComplete',
  GetBoostJobUtxos = 'GetBoostJobUtxos',
  GetBoostJobUtxosComplete = 'GetBoostJobUtxosComplete',
}

export class GetBoostJob implements Action {
  readonly type = OffersActionTypes.GetBoostJob;
  constructor(public payload: string) {}
}

export class GetBoostJobComplete implements Action {
  readonly type = OffersActionTypes.GetBoostJobComplete;
  constructor(public payload: any) {}
}

export class GetBoostJobUtxos implements Action {
  readonly type = OffersActionTypes.GetBoostJobUtxos;
  constructor(public payload: string) {}
}

export class GetBoostJobUtxosComplete implements Action {
  readonly type = OffersActionTypes.GetBoostJobUtxosComplete;
  constructor(public payload: any) {}
}

export class GetStatus implements Action {
  readonly type = OffersActionTypes.GetStatus;
  constructor(public payload: string) {}
}

export class GetStatusComplete implements Action {
  readonly type = OffersActionTypes.GetStatusComplete;
  constructor(public payload: UploadStatus) {}
}

export class SetSessionKey implements Action {
  readonly type = OffersActionTypes.SetSessionKey;
  constructor(public payload: string) {}
}

export class RedirectAction implements Action {
  readonly type = OffersActionTypes.RedirectAction;
  constructor(public payload: string) {}
}

export type OffersActions =
  | RedirectAction
  | GetStatus
  | GetStatusComplete
  | SetSessionKey
  | GetBoostJob
  | GetBoostJobComplete
  | GetBoostJobUtxos
  | GetBoostJobUtxosComplete;







