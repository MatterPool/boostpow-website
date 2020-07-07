import { ActionReducer, Action } from '@ngrx/store';
import { ApplicationActionTypes } from '@application/actions/application';
import { Application } from '@application/models/application.interface';
export { Application as State };

const initialState: Application = {
  loading: {
    active: false,
    counter: 0
  }
};

export function reducer(state: Application = initialState, action: Action): Application {
  switch (action.type) {
    case ApplicationActionTypes.showLoading:
      const showLoadingState = { counter: state.loading.counter + 1, active: true };
      return Object.assign({}, state, { loading: showLoadingState });

    case ApplicationActionTypes.hideLoading:
      // tslint:disable-next-line:prefer-const
      let hideLoadingState = { counter: state.loading.counter, active: true };
      // tslint:disable:curly
      if (hideLoadingState.counter >= 1) hideLoadingState.counter--;
      if (hideLoadingState.counter === 0) hideLoadingState.active = false;
      // tslint:enable:curly
      return Object.assign({}, state, { loading: hideLoadingState });

    case ApplicationActionTypes.hideLoadingAll:
      // Force disable all loading
      return Object.assign({}, state, { loading: { counter: 0, active: false } });

    default: {
      return state;
    }
  }
}
