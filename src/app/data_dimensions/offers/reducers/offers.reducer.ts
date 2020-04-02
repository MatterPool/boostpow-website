import { OffersActions, OffersActionTypes } from '@offers/actions/offers.actions';
import { UploadStatus } from '@offers/models/upload-status.interface';

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

export function reducer(state = initialState, action: OffersActions): State {
  switch (action.type) {

    case OffersActionTypes.GetBoostSearchComplete: {
      return {
        ...state,
        boostSearchResults: action.payload
      };
    }

    case OffersActionTypes.GetStatusComplete: {

      return {
        ...state,
        uploadStatus: action.payload
      };
    }

    case OffersActionTypes.GetBoostJobComplete: {

      return {
        ...state,
        job: action.payload
      };
    }

    case OffersActionTypes.GetBoostJobUtxosComplete: {

      return {
        ...state,
        jobUtxos: action.payload
      };
    }

    case OffersActionTypes.SetSessionKey: {

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
