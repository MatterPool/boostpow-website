import { Action } from '@ngrx/store';
import { UploadStatus } from '@main/models/upload-status.interface';
import * as Boost from 'boostpow-js';

console.log('Boost', Boost);
export enum MainActionTypes {
  RedirectAction = 'MainActionTypes',
  GetStatus = 'Getstatus',
  GetStatusComplete = 'GetStatusComplete',
  SetSessionKey = 'SetSessionKey',
  GetBoostJob = 'GetBoostJob',
  GetBoostJobComplete = 'GetBoostJobComplete',
  GetBoostJobUtxos = 'GetBoostJobUtxos',
  GetBoostJobUtxosComplete = 'GetBoostJobUtxosComplete',
  GetBoostSearch = 'GetBoostSearch',
  GetBoostSearchComplete = 'GetBoostSearchComplete',
}

export class GetBoostJob implements Action {
  readonly type = MainActionTypes.GetBoostJob;
  constructor(public payload: string) {}
}

export class GetBoostJobComplete implements Action {
  readonly type = MainActionTypes.GetBoostJobComplete;
  constructor(public payload: any) {}
}

export class GetBoostSearch implements Action {
  readonly type = MainActionTypes.GetBoostSearch;
  constructor(public payload: any) {}
}

export class GetBoostSearchComplete implements Action {
  readonly type = MainActionTypes.GetBoostSearchComplete;
  constructor(public payload: any) {}
}

export class GetBoostJobUtxos implements Action {
  readonly type = MainActionTypes.GetBoostJobUtxos;
  constructor(public payload: string) {}
}

export class GetBoostJobUtxosComplete implements Action {
  readonly type = MainActionTypes.GetBoostJobUtxosComplete;
  constructor(public payload: any) {}
}

export class GetStatus implements Action {
  readonly type = MainActionTypes.GetStatus;
  constructor(public payload: string) {}
}

export class GetStatusComplete implements Action {
  readonly type = MainActionTypes.GetStatusComplete;
  constructor(public payload: UploadStatus) {}
}

export class SetSessionKey implements Action {
  readonly type = MainActionTypes.SetSessionKey;
  constructor(public payload: string) {}
}

export class RedirectAction implements Action {
  readonly type = MainActionTypes.RedirectAction;
  constructor(public payload: string) {}
}

export type MainActions =
  | RedirectAction
  | GetStatus
  | GetStatusComplete
  | SetSessionKey
  | GetBoostJob
  | GetBoostJobComplete
  | GetBoostJobUtxos
  | GetBoostJobUtxosComplete
  | GetBoostSearch
  | GetBoostSearchComplete;



