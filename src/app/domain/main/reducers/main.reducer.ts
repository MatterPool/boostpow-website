import { MainActions, MainActionTypes } from '@main/actions/main.actions';
import { BoostPowJobModel } from 'boostpow-js/dist/boost-pow-job-model';
export interface State {
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

    default: {
      return state;
    }
  }
}
