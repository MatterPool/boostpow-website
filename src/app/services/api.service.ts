import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '@environments/environment';
import * as fromRoot from '@app/reducers';
import ApiRequestResponse from './api-request-response';
import * as axios from 'axios';
import * as Boost from 'boostpow-js';

@Injectable()
export class ApiService {
  constructor(private store: Store<fromRoot.State>) {}

  getBoostJobUtxos(scriptHash: string): Observable<any> {
    const p = new Promise((res, rej) => {
      if (environment.mock_mode) {
        const mockData = {
          success: true,
          result: {

          }
        };
        const response = new ApiRequestResponse(mockData, 200);
        console.log('getBoostJobUtxos mock data', mockData, response);
        res(response);
        return;
      }
      try {
        console.log('getBoostJobUtxos', scriptHash);
        return Boost.Graph().getBoostJobUtxos(scriptHash)
        .then((r) => {
          res(r);
        })
        .catch((e) => {
          const response = new ApiRequestResponse(e.response ? e.response.data : e, e.error ? e.error : null);
          rej(response);
        });
      } catch (err) {
        rej(
          new ApiRequestResponse(null, {
            message: `Error`
          })
        );
      }
    });

    return from(p);
  }

  getBoostJob(txid: string): Observable<any> {
    const p = new Promise((res, rej) => {
      if (environment.mock_mode) {
        const mockData = {
          success: true,
          result: {

          }
        };

        const response = new ApiRequestResponse(mockData, 200);
        console.log('getBoostJob mock data', mockData, response);
        res(response);
        return;
      }
      try {
        return Boost.Graph().loadBoostJob(txid)
        .then((r) => {
          res(r);
        })
        .catch((e) => {
          const response = new ApiRequestResponse(e.response ? e.response.data : e, e.error ? e.error : null);
          rej(response);
        });
      } catch (err) {
        rej(
          new ApiRequestResponse(null, {
            message: `Error`
          })
        );
      }
    });

    return from(p);

  }

  getStatus(tag: string): Observable<any> {
    const p = new Promise((res, rej) => {

      if (environment.mock_mode) {
        const mockData = {
          success: true,
          result: {
            '4': {
              "puid": 4,
              "totalPaid": "0",
              "pendingPayouts": "0",
              "lastPaymentTime": (new Date()).getTime(),
              "earningsToday": "0",
              "earningsYesterday": "0",
              "unpaid": "0"
            }
          }
        };

        const response = new ApiRequestResponse(mockData, 200);
        console.log('getStatus mock data', mockData, response);
        res(response);
        return;
      }

      try {
        axios.default.get(`${environment.fileupload_api_base}/status/${tag}`)
        .then((r) => {
          const response = new ApiRequestResponse(r.data, r.status);
          res(response);
        })
        .catch((e) => {
          const response = new ApiRequestResponse(e.response ? e.response.data : e, e.status ? e.status : null);
          rej(response);
        });
      } catch (err) {
        rej(
          new ApiRequestResponse(null, {
            message: `Error`
          })
        );
      }
    });

    return from(p);
  }
}
