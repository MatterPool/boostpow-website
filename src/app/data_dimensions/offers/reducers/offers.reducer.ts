import { OffersActions, OffersActionTypes } from '@offers/actions/offers.actions';
import { UploadStatus } from '@offers/models/upload-status.interface';

export interface State {
  uploadStatus?: UploadStatus,
  sessionKey?: string
}

export const initialState: State = {
  uploadStatus: null,
  sessionKey: null,
};

export function reducer(state = initialState, action: OffersActions): State {
  switch (action.type) {

    case OffersActionTypes.GetStatusComplete: {

      return {
        ...state,
        uploadStatus: action.payload
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
