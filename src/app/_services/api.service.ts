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

  private ranksSubject: BehaviorSubject<any>;
  public ranks: Observable<any>;

  private topicsSubject: BehaviorSubject<any>;
  public topics: Observable<any>;

  constructor(private http: HttpClient) {
    this.boostSubject = new BehaviorSubject<any>([]);
    this.boosts = this.boostSubject.asObservable();

    this.searchSubject = new BehaviorSubject<any>([]);
    this.search = this.searchSubject.asObservable();

    this.incompleteBoostSubject = new BehaviorSubject<any>([]);
    this.incompleteBoosts = this.incompleteBoostSubject.asObservable();

    this.ranksSubject = new BehaviorSubject<any>([]);
    this.ranks = this.ranksSubject.asObservable();

    this.topicsSubject = new BehaviorSubject<any>([]);
    this.topics = this.topicsSubject.asObservable();
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

    //Execute search
    const results: any = await this.http.get(searchUrl).toPromise();

    //Group results by unique boost content
    let grouped = Object(null);
    results.mined.forEach(r => {
      if(grouped[r.boostData.content]){
        grouped[r.boostData.content].value += r.boostJob.value;
        grouped[r.boostData.content].diff += r.boostJob.diff;
        grouped[r.boostData.content].jobs.push(r.boostJob);
      } else {
        Object.assign(grouped, { [r.boostData.content]: { ...r.boostData, jobs: [r.boostJob], diff: r.boostJob.diff, value: r.boostJob.value } });
      }
    });

    //Convert to array and order by PoW
    let ranked = Object.keys(grouped).map(k => { 
      return { content: k, ...grouped[k], diff: Math.round(grouped[k].diff) } }).sort((a,b) => {return b.diff - a.diff}).map((x, i) => {
      return {...x, rank: i+1};
    });

    //Assign to behaviour subject to make cascading changes
    this.boostSubject.next(ranked);
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

  async getRanksData(id:string, t:number) {
    let searchUrl = `${environment.apiUrl}/search`;

    //Create query params
    let query:string[] = [];
    if(t>0) {
      const t2 = Math.floor(new Date().getTime()/1000) - t;
      query.push("minedTimeFrom=" + t2);
    }
    if(query.length){
      searchUrl+="?"+query.join("&");
    }

    console.log("loading ranks data");

    //Execute search
    const results: any = await this.http.get(searchUrl).toPromise();

    console.log("results = ", results);

    let topics = Object(null);

    let grouped = Object(null);
    results.mined.forEach(r => {
      if(r.boostData.content == id && !topics[r.boostData.tagutf8]) {
        Object.assign(topics, {[r.boostData.tagutf8] : null});
      }
      if(grouped[r.boostData.content]){
        grouped[r.boostData.content] += r.boostJob.diff;
      } else {
        Object.assign(grouped, { [r.boostData.content]: r.boostJob.diff });
      }
    });

    //Assign to behaviour ranks to make cascading changes
    this.ranksSubject.next(Object.keys(topics).map(topic => {

      let g = Object(null);
      if (topic == '') {
        g = grouped;
      } else {
        results.mined.forEach(r => {
          if(r.boostData.tagutf8 == topic) {
            if (g[r.boostData.content]){
              g[r.boostData.content] += r.boostJob.diff;
            } else {
              Object.assign(g, { [r.boostData.content]: r.boostJob.diff });
            }
          }
        });
      }

      let ranked = Object.keys(g).map(k => { 
        return { content: k, difficulty: g[k] } }).sort((a,b) => {return b.difficulty - a.difficulty});

      for(let i = 0; i < ranked.length; i++) {
        if (ranked[i].content == id) return {topic: topic, rank: i + 1, difficulty: ranked[i].difficulty};
      }
    }));
  }

  async getTopicsData(t:number) {
    let searchUrl = `${environment.apiUrl}/search`;

    //Create query params
    let query:string[] = [];
    if(t>0) {
      const t2 = Math.floor(new Date().getTime()/1000) - t;
      query.push("minedTimeFrom=" + t2);
    }
    if(query.length){
      searchUrl+="?"+query.join("&");
    }

    //Execute search
    const results: any = await this.http.get(searchUrl).toPromise();

    let topics = {'':0};

    results.mined.forEach(r => {
      if(r.boostData.tagutf8 != '') {
        if(topics[r.boostData.tagutf8]){
          topics[r.boostData.tagutf8] += r.boostJob.diff;
        } else {
          Object.assign(topics, { [r.boostData.tagutf8]: r.boostJob.diff });
        }
      }
      topics[''] += r.boostJob.diff;
    });

    //Assign to behaviour topics to make cascading changes
    this.topicsSubject.next(Object.keys(topics).map(topic => { 
      return { topic: topic, difficulty: topics[topic] } }).sort((a,b) => { return b.difficulty - a.difficulty }));
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