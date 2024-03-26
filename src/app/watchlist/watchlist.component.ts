import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { MongoDbService } from '../mongo-db.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  // public watchList: any[] = [{ticker: 'AAPL', name:'Apple Inc.', price: '', change:'', changePercent:''}, {ticker: 'TSLA', name:'Tesla Corp.', price: '', change:'', changePercent:''}];
  public watchList = [];
  companyQuote;
  mongoList: any;

  constructor(private apiService: ApiServiceService, private mongoDbService: MongoDbService) {}

  ngOnInit(){

    let a=[];
    let count = 0;

    this.mongoDbService.getWatchlist().toPromise().then(data=>{
      this.mongoList = data
      console.log(this.mongoList);
      for(let watch of this.mongoList){
        let obj = {ticker: '', name:'', price:0, change:0, changePercent:0 };
        obj.ticker = watch.ticker;
        obj.name = watch.name;
        this.watchList.push(obj);
      }
  
      for(let watch of this.watchList){ 
      // Get Quote Data
      let b=this.apiService.getQuoteData(watch.ticker).toPromise().then(data=>{
          this.companyQuote = data;
          this.watchList[count].price = this.companyQuote.c;
          this.watchList[count].change = this.companyQuote.d;
          this.watchList[count].changePercent = (this.companyQuote.dp).toFixed(2);
          count++;
  
        });
  
      a.push(b);
      }
  
      Promise.all(a).then(() => {
  
      });

    });



  }


  onRemoveWatch(ticker){
    console.log(ticker);
    
    this.watchList = this.watchList.filter(item => item.ticker !== ticker);
    this.mongoDbService.deleteFromWatchlist(ticker).toPromise().then(x => console.log(x));

  }
}
