import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MongoDbService {

  constructor(private http: HttpClient) { }

  // Add to Watchlist Function
  addToWatchlist(watchlistData){
    let watchlist = {ticker:'', name:''}
    watchlist.ticker = watchlistData.ticker;
    watchlist.name = watchlistData.name;
    return this.http.post('http://localhost:3000/DB/Angular_Stock_Search/Watchlist_Data', watchlist);
  }

  // Get Watchlist Function
  getWatchlist(){
    return this.http.get("http://localhost:3000/DB/Angular_Stock_Search/Watchlist_Data");
  }


  //  Delete from Watchlist Function
  deleteFromWatchlist(ticker){
    const url = "http://localhost:3000/DB/Angular_Stock_Search/Watchlist_Data?ticker="+ticker;
    console.log(url);
    return  this.http.delete(url);
  }

  // Add to Portfolio Function
  addToPortfoliolist(portfolioData){
    let stock = {ticker: '', name: '', avgCostPerShare: '', quantity: ''}
    stock.ticker= portfolioData.ticker;
    stock.name = portfolioData.name
    stock.avgCostPerShare = portfolioData.avgCostPerShare
    stock.quantity = portfolioData.quantity
    return this.http.post('http://localhost:3000/DB/Angular_Stock_Search/Portfolio_Data', stock);
  }

  // Update Portfolio Function
  updateToPortfoliolist(portfolioData){
    let stock = {avgCostPerShare: '', quantity: ''}
    stock.avgCostPerShare = portfolioData.avgCostPerShare
    stock.quantity = portfolioData.quantity
    return this.http.put('http://localhost:3000/DB/Angular_Stock_Search/Portfolio_Data?ticker='+portfolioData.ticker, {'$set': stock});
  }

  //  Delete from Portfolio Function
  deleteFromPortfoliolist(ticker){
    return this.http.delete('http://localhost:3000/DB/Angular_Stock_Search/Portfolio_Data?ticker='+ticker);
  }

  // Get Portfolio Function
  getPortfoliolist(){
    return this.http.get('http://localhost:3000/DB/Angular_Stock_Search/Portfolio_Data');
  }


}
