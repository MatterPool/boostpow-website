import { MainActions, MainActionTypes } from '@main/actions/main.actions';
import { UploadStatus } from '@main/models/upload-status.interface';

import { BoostPowJob } from 'boostpow-js';
import { BoostPowJobModel } from 'boostpow-js/dist/boost-pow-job-model';
import { BoostSignalModel } from 'boostpow-js/dist/boost-signal-model';

export interface State {
  uploadStatus?: UploadStatus,
  sessionKey?: string,
  job?: BoostPowJobModel,
  jobUtxos: Array<{
    scripthash: string,
    txid: string,
    vout: number,
    satoshis: number,
    height: number
  }>,
  boostSearchResults: Array<any>;
}

export const initialState: State = {
  uploadStatus: null,
  sessionKey: null,
  job: null,
  jobUtxos: [],
  boostSearchResults: [],
};

export function reducer(state = initialState, action: MainActions): State {
  switch (action.type) {

    case MainActionTypes.GetBoostSearchComplete: {
      return {
        ...state,
        boostSearchResults: action.payload
      };
    }

    case MainActionTypes.GetStatusComplete: {

      return {
        ...state,
        uploadStatus: action.payload
      };
    }

    case MainActionTypes.GetBoostJobComplete: {

      return {
        ...state,
        job: action.payload
      };
    }

    case MainActionTypes.GetBoostJobUtxosComplete: {

      return {
        ...state,
        jobUtxos: action.payload
      };
    }

    case MainActionTypes.SetSessionKey: {

      return {
        ...state,
        sessionKey: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
