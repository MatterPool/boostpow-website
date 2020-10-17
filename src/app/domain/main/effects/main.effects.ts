import { Injectable } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { AlertsActionTypes } from '@app/domain/alerts/actions/alerts';
import { MainActionTypes, RedirectAction,  GetBoostJob, GetBoostJobComplete, GetBoostJobUtxos, GetBoostJobUtxosComplete, GetBoostSearch, GetBoostSearchComplete, GetBoostJobs, GetBoostJobsComplete } from '../actions/main.actions';
import { ApiService } from '@app/services/api.service';
import { ApplicationActionTypes } from '@application/actions/application';
import { environment } from '@environments/environment';
import { apiMapErrorString } from '@app/helpers/apiErrorMapper';
import { Router } from '@angular/router';
import { parseBoostJob } from '@main/parsers/parse-boost-job';
import { parseBoostJobs } from '@main/parsers/parse-boost-jobs';
import { parseBoostSearch } from '@main/parsers/parse-boost-search';

@Injectable()
export class MainEffects {

  @Effect()
  getBoostJobs$: Observable<Action> = this.actions$.pipe(
    ofType<GetBoostJobs>(MainActionTypes.GetBoostJobs),
    mergeMap(action => {
      return this.apiService
        .getBoostJobs(action.payload)
        .pipe(
          mergeMap((r: any) => {
            return from([
              new GetBoostJobsComplete(parseBoostJobs(r)),
              { type: ApplicationActionTypes.hideLoading }
            ]);
          }),
          catchError((err) => {
            if (err.response.name === 'AuthorizationRequiredError') {
              return from([
                new RedirectAction(environment.redirect_after_account_logout),
                { type: ApplicationActionTypes.hideLoading }
              ]);
            } else {
              return from([
                {
                  type: AlertsActionTypes.PushAlert,
                  payload: {
                    type: 'danger',
                    message: apiMapErrorString(err.errorMessage),
                    id: 'accountLoginError',
                    permanent: false,
                    imperative: true
                  }
                },
                { type: ApplicationActionTypes.hideLoading }
              ]);
            }
          })
        );
    })
  );

  @Effect()
  getBoostJob$: Observable<Action> = this.actions$.pipe(
    ofType<GetBoostJob>(MainActionTypes.GetBoostJob),
    mergeMap(action => {
      return this.apiService
        .getBoostJob(action.payload)
        .pipe(
          mergeMap((r: any) => {
            return from([
              new GetBoostJobComplete(parseBoostJob(r)),
              { type: ApplicationActionTypes.hideLoading }
            ]);
          }),
          catchError((err) => {
            if (err.response.name === 'AuthorizationRequiredError') {
              return from([
                new RedirectAction(environment.redirect_after_account_logout),
                { type: ApplicationActionTypes.hideLoading }
              ]);
            } else {
              return from([
                {
                  type: AlertsActionTypes.PushAlert,
                  payload: {
                    type: 'danger',
                    message: apiMapErrorString(err.errorMessage),
                    id: 'accountLoginError',
                    permanent: false,
                    imperative: true
                  }
                },
                { type: ApplicationActionTypes.hideLoading }
              ]);
            }
          })
        );
    })
  );

  @Effect()
  getBoostSearch$: Observable<Action> = this.actions$.pipe(
    ofType<GetBoostSearch>(MainActionTypes.GetBoostSearch),
    mergeMap(action => {
      return this.apiService
        .getBoostSearch(action.payload)
        .pipe(
          mergeMap((r: any) => {
            return from([
              new GetBoostSearchComplete(parseBoostSearch(r)),
              { type: ApplicationActionTypes.hideLoading }
            ]);
          }),
          catchError((err) => {
            if (err.response.name === 'AuthorizationRequiredError') {
              return from([
                new RedirectAction(environment.redirect_after_account_logout),
                { type: ApplicationActionTypes.hideLoading }
              ]);
            } else {
              return from([
                {
                  type: AlertsActionTypes.PushAlert,
                  payload: {
                    type: 'danger',
                    message: apiMapErrorString(err.errorMessage),
                    id: 'accountLoginError',
                    permanent: false,
                    imperative: true
                  }
                },
                { type: ApplicationActionTypes.hideLoading }
              ]);
            }
          })
        );
    })
  );
  @Effect()
  getBoostJobUtxos$: Observable<Action> = this.actions$.pipe(
    ofType<GetBoostJobUtxos>(MainActionTypes.GetBoostJobUtxos),
    mergeMap(action => {
      return this.apiService
        .getBoostJobUtxos(action.payload)
        .pipe(
          mergeMap((r: any) => {
            return from([
              new GetBoostJobUtxosComplete(r),
              { type: ApplicationActionTypes.hideLoading }
            ]);
          }),
          catchError((err) => {
            if (err.response.name === 'AuthorizationRequiredError') {
              return from([
                new RedirectAction(environment.redirect_after_account_logout),
                { type: ApplicationActionTypes.hideLoading }
              ]);
            } else {
              return from([
                {
                  type: AlertsActionTypes.PushAlert,
                  payload: {
                    type: 'danger',
                    message: apiMapErrorString(err.errorMessage),
                    id: 'accountLoginError',
                    permanent: false,
                    imperative: true
                  }
                },
                { type: ApplicationActionTypes.hideLoading }
              ]);
            }
          })
        );
    })
  );

  @Effect()
  redirectToUrl$: Observable<Action> = this.actions$.pipe(
    ofType<RedirectAction>(MainActionTypes.RedirectAction),
    map((action: RedirectAction) => action.payload),
    mergeMap((data) => {
      window.location.href = data;
      return from([]);
    })
  );

  constructor(private actions$: Actions, private router: Router, private store: Store<any>, private apiService: ApiService, private titleCasePipe: TitleCasePipe) {}
}
