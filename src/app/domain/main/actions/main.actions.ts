import { Action } from '@ngrx/store';
import * as Boost from '@matterpool/boostpow-js';

console.log('Boost', Boost);
export enum MainActionTypes {
  RedirectAction = 'MainActionTypes',
  SetSessionKey = 'SetSessionKey',
  GetBoostJob = 'GetBoostJob',
  GetBoostJobComplete = 'GetBoostJobComplete',
  GetBoostJobs = 'GetBoostJobs',
  GetBoostJobsComplete = 'GetBoostJobsComplete',
  GetBoostJobUtxos = 'GetBoostJobUtxos',
  GetBoostJobUtxosComplete = 'GetBoostJobUtxosComplete',
  GetBoostSearch = 'GetBoostSearch',
  GetBoostSearchComplete = 'GetBoostSearchComplete',
}

export class GetBoostJobs implements Action {
  readonly type = MainActionTypes.GetBoostJobs;
  constructor(public payload: string) {}
}

export class GetBoostJobsComplete implements Action {
  readonly type = MainActionTypes.GetBoostJobsComplete;
  constructor(public payload: any) {}
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
  | SetSessionKey
  | GetBoostJob
  | GetBoostJobComplete
  | GetBoostJobUtxos
  | GetBoostJobUtxosComplete
  | GetBoostSearch
  | GetBoostSearchComplete
  | GetBoostJobs
  | GetBoostJobsComplete;
  


