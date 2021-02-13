import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private boostSubject: BehaviorSubject<any>;
  public boosts: Observable<any>;

  private incompleteBoostSubject: BehaviorSubject<any>;
  public incompleteBoosts: Observable<any>;

  private searchSubject: BehaviorSubject<any>;
  public search: Observable<any>;

  constructor(private http: HttpClient) {
    this.boostSubject = new BehaviorSubject<any>([]);
    this.boosts = this.boostSubject.asObservable();
    this.searchSubject = new BehaviorSubject<any>([]);
    this.search = this.searchSubject.asObservable();
    this.incompleteBoostSubject = new BehaviorSubject<any>([]);
    this.incompleteBoosts = this.incompleteBoostSubject.asObservable();
    // this.searchBoost("B", 86400*14);
  }

  async searchBoost(q?:string, t?:number) {
    this.searchSubject.next({ topic: q, timeframe: t});
    //Set API URL
    let searchUrl = `${environment.apiUrl}/search`;

    //Create query params
    let query:string[] = [];
    if(!!q){
      query.push("tag=" + q)
    }
    if(!!t && t>0) {
      const t2 = Math.floor(new Date().getTime()/1000) - t;
      query.push("minedTimeFrom=" + t2);
    }
    if(query.length){
      searchUrl+="?"+query.join("&");
    }

    console.log("search query is ", searchUrl);

    //Execute search
    const results: any = await this.http.get(searchUrl).toPromise();

    //Group results by unique boost content
    let finalResults = Object(null);
    results.mined.forEach(r => {
      if(finalResults[r.boostData.content]){
        finalResults[r.boostData.content].value += r.boostJob.value;
        finalResults[r.boostData.content].diff += r.boostJob.diff;
        finalResults[r.boostData.content].jobs.push(r.boostJob);
      } else {
        Object.assign(finalResults, { [r.boostData.content]: { ...r.boostData, jobs: [r.boostJob], diff: r.boostJob.diff, value: r.boostJob.value } });
      }
    });
    //Convert to array and order by PoW
    finalResults = Object.keys(finalResults).map(k => { 
      return { content: k, ...finalResults[k], diff: Math.round(finalResults[k].diff) } }).sort((a,b) => {return b.diff - a.diff}).map((x, i) => {
      return {...x, rank: i+1};
    });
    //Assign to behaviour subject to make cascading changes
    this.boostSubject.next(finalResults);
  }

  async searchIncompleteBoost(t?:number) {
    this.searchSubject.next({timeframe: t});
    //Set API URL
    let searchUrl = `${environment.apiUrl}/search`;

    //Create query params
    let query:string[] = [];
    if(!!t && t>0) {
      const t2 = Math.floor(new Date().getTime()/1000) - t;
      query.push("createdTimeFrom=" + t2);
    }
    query.push("unmined=only");
    if(query.length){
      searchUrl+="?"+query.join("&");
    }

    //Execute search
    const results: any = await this.http.get(searchUrl).toPromise();

    console.log("results.unmined = ", results.unmined);

    //Group results by unique boost content
    let finalResults = Object(null);
    results.unmined.forEach(r => {
      const outpointArray = r.boostJobId.split(".");
      const outpoint = {
        txid : outpointArray[0],
        index : outpointArray[1]
      };
      if(finalResults[r.boostJob.scripthash]){
        finalResults[r.boostJob.scripthash].value += r.boostJob.value;
        finalResults[r.boostJob.scripthash].outpoints.push(outpoint);
      } else {
        Object.assign(finalResults, { [r.boostJob.scripthash]: { 
          diff: r.boostJob.diff, 
          value: r.boostJob.value , 
          outpoints: [outpoint] 
        } });
      }
    });
    console.log("B final results = ", finalResults);
    
    //Convert to array and order by profitability
    finalResults = Object.keys(finalResults).map(k => { 
      const v = finalResults[k];
      return { 
        scriptHash: k, 
        diff: v.diff,
        value: v.value,
        profitability: v.value / v.diff, 
        outpoints: v.outpoints, 
        content: v.content
      } 
    }).sort((a,b) => {
      return b.profitability - a.profitability
    });

    console.log("C final results = ", finalResults);
    //Assign to behaviour subject to make cascading changes
    this.incompleteBoostSubject.next(finalResults);
  }

  public get boostsValue(): any {
    return this.boostSubject.value;
  }

  async getFileType(id: string) {
    const r = await this.http.head(` https://media.bitcoinfiles.org/${id}`, {observe: 'response'}).toPromise();
    return r.headers.get('content-type')?.replace("; charset=utf-8", "") || 'unknown';
  }

  async getOne(id: string){
    // const one = this.boosts.value.find(x => { return x.content === id})
    const results: any = await this.http.get(`${environment.apiUrl}/search?contenthex=${id}`).toPromise();
    let finalResults = {
      content: id,
      ...results.mined[0].boostData,
      value: 0,
      diff: 0,
      rank: 0,
      tags: [],
      jobs: []
    };
    results.mined.forEach(r => {
      finalResults.value += r.boostJob.value;
      finalResults.diff += r.boostJob.diff;
      finalResults.jobs.push(r.boostJob);
      if(r.boostData.tagutf8 && finalResults.tags.indexOf(r.boostData.tagutf8)<0){
        finalResults.tags.push(r.boostData.tagutf8);
      }
    });
    finalResults.diff = Math.round(finalResults.diff);
    console.log(finalResults);
    return finalResults;
  }
};

export const TimeSelectOptions = [
  {
    title: "all time",
    value: 0
  },
  {
    title: "hour",
    value: 3600
  },
  {
    title: "day",
    value: 86400
  },
  {
    title: "week",
    value: 86400*7
  },
  {
    title: "fortnight",
    value: 86400*14
  },
  {
    title: "year",
    value: 86400*365.25
  },
  {
    title: "decade",
    value: 86400*365.25*10
  }
];