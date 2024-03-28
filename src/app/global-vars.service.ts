import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  private tickerQuery = new BehaviorSubject('');
  getTickerMessage = this.tickerQuery.asObservable();

  private wallet = new BehaviorSubject(25000);
  getWalletMessage = this.wallet.asObservable();

  private stockData = new BehaviorSubject('');
  getStockDataMessage = this.stockData.asObservable();

  private quoteData = new BehaviorSubject('');
  getQuoteDataMessage = this.quoteData.asObservable();

  private chartsData = new BehaviorSubject('');
  getChartsDataMessage = this.chartsData.asObservable();

  private summaryChartData = new BehaviorSubject('');
  getSummaryChartDataMessage = this.summaryChartData.asObservable();

  private searchData = new BehaviorSubject('');
  getSearchDataMessage = this.searchData.asObservable();

  private newsData = new BehaviorSubject('');
  getNewsDataMessage = this.newsData.asObservable();

  private recommendationData = new BehaviorSubject('');
  getRecommendationDataMessage = this.recommendationData.asObservable();

  private insiderData = new BehaviorSubject('');
  getInsiderDataMessage = this.insiderData.asObservable();

  private peersData = new BehaviorSubject('');
  getPeersDataMessage = this.peersData.asObservable();

  private earningsData = new BehaviorSubject('');
  getEarningsDataMessage = this.earningsData.asObservable();

  // private alertSubject = new Subject<string>();
  // alert$ = this.alertSubject.asObservable();

  // private alertSellSubject = new Subject<string>();
  // alertSell$ = this.alertSellSubject.asObservable();


  constructor() { }

  //Ticker
  setTicker(message: string){
    this.tickerQuery.next(message);
  }

  getTicker(){
    return this.tickerQuery.value;
  }

  // //Buy Alert
  // showAlert(message: string) {
  //   this.alertSubject.next(message);
  // }

  // //Sell Alert
  // showSellAlert(message: string) {
  //   this.alertSellSubject.next(message);
  // }

  //Wallet
  setWallet(message: number){
    this.wallet.next(message);
  }

  getWallet(){
    return this.wallet.value;
  }

  //Stock Data
  setStockData(message: any){
    this.stockData.next(message);
  }

  getStockData(){
    return this.stockData.value;
  }


  //Quote Data
  setQuoteData(message: any){
    this.quoteData.next(message);
  }

  getQuoteData(){
    return this.quoteData.value;
  }
  
  //Charts Data
  setChartsData(message: any){
    this.chartsData.next(message);
  }

  getChartsData(){
    return this.chartsData.value;
  }

  // Summary Chart Data
  setSummaryChartData(message: any){
    this.summaryChartData.next(message);
  }

  getSummaryChartData(){
    return this.summaryChartData.value;
  }


  //Search Data
  setSearchData(message: any){
    this.searchData.next(message);
  }

  getSearchData(){
    return this.searchData.value;
  }

  
  //News Data
  setNewsData(message: any){
    this.newsData.next(message);
  }

  getNewsData(){
    return this.newsData.value;
  }

  
  //Recommendation Data
  setRecommendationData(message: any){
    this.recommendationData.next(message);
  }

  getRecommendationData(){
    return this.recommendationData.value;
  }


  //Insider Data
  setInsiderData(message: any){
    this.insiderData.next(message);
  }

  getInsiderData(){
    return this.insiderData.value;
  }

  
  //Peers Data
  setPeersData(message: any){
    this.peersData.next(message);
  }

  getPeersData(){
    return this.peersData.value;
  }

  //Earnings Data
  setEarningsData(message: any){
    this.earningsData.next(message);
  }

  getEarningsData(){
    return this.earningsData.value;
  }
}
