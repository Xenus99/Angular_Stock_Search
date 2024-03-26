import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  getStockData(tickerQuery: string){
    let url="http://localhost:3000/stockdata?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getSummaryChartData(tickerQuery: string){
    // let url="http://localhost:3000/charts?ticker="+tickerQuery+'&from='+from+'&to='+to;
    let url="http://localhost:3000/summarychart?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getChartsData(tickerQuery: string){
    let url="http://localhost:3000/charts?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getQuoteData(tickerQuery: string){
    let url="http://localhost:3000/quote?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getSearchData(tickerQuery: string){
    let url="http://localhost:3000/search?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getNewsData(tickerQuery: string){
    let url="http://localhost:3000/news?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getRecommendationData(tickerQuery: string){
    let url="http://localhost:3000/recommendation?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getInsiderData(tickerQuery: string){
    let url="http://localhost:3000/insider?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getPeersData(tickerQuery: string){
    let url="http://localhost:3000/peers?ticker="+tickerQuery;
    return this.http.get(url);
  }

  getEarningsData(tickerQuery: string){
    let url="http://localhost:3000/earnings?ticker="+tickerQuery;
    return this.http.get(url);
  }
}
