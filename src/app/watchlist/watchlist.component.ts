import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { MongoDbService } from '../mongo-db.service';
import { GlobalVarsService } from '../global-vars.service';
import {interval} from "rxjs";


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
  spinner: boolean = true;
  tickerQuery: string;
  QuoteSub: any;


  constructor(private apiService: ApiServiceService, private mongoDbService: MongoDbService, private globalVars: GlobalVarsService) {}

  ngOnInit(){
    this.spinner = true;

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
      this.spinner = false;
  
      Promise.all(a).then(() => {

        this.globalVars.getTickerMessage.subscribe(msg => {
          this.tickerQuery = msg;
    
          if(this.tickerQuery){
            if(this.QuoteSub){  
              this.QuoteSub.unsubscribe();
            }
            this.QuoteSub = interval(15000).subscribe(() =>
              {
                this.apiService.getQuoteData(this.tickerQuery).toPromise().then(data =>{
                  this.companyQuote = data;
                  this.globalVars.setQuoteData(this.companyQuote);
                });
              }
            )
          }
    
        });
    

      });

    });

  }

  onRemoveWatch(ticker){
    console.log(ticker);
    
    this.watchList = this.watchList.filter(item => item.ticker !== ticker);
    this.mongoDbService.deleteFromWatchlist(ticker).toPromise().then(x => console.log(x));

  }
}
