import {Component, Input, OnInit, inject, OnDestroy} from '@angular/core';
import { GlobalVarsService } from '../../global-vars.service';
import{ ApiServiceService } from '../../api-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyBuyModalComponentComponent } from './company-buy-modal-component/company-buy-modal-component.component';
import { CompanySellModalComponent } from './company-sell-modal/company-sell-modal.component';
import { MongoDbService } from '../../mongo-db.service';
import {interval} from "rxjs";



@Component({
  selector: 'app-companyheader',
  templateUrl: './companyheader.component.html',
  styleUrl: './companyheader.component.css'
})

export class CompanyheaderComponent implements OnInit, OnDestroy{

  route: ActivatedRoute = inject(ActivatedRoute);
  QuoteSub: any;
  tickerQuery: string;
  companySummary: any;
  companyQuote: any;
  formattedTime;
  formattedCurrentTime;
  marketStatus: string = ' is Open';
  wallet: number;
  myQuantity;
  stockModel: any;
  isFav: boolean = false;
  portfolioData;
  watchList;
  bought: boolean = false;
  sold: boolean = false;
  fav: boolean = false;
  unfav: boolean = false;

  title = 'Company Data';

  // Modal Declaration
  private modalService = inject(NgbModal);


  constructor(private  globalVars: GlobalVarsService, private apiService: ApiServiceService, private mongoDbService: MongoDbService) { }

  ngOnInit(){

    this.fav = false;
    this.unfav = false;
    this.bought = false;
    this.sold = false;
    let currentTime = new Date();
    this.formattedCurrentTime = currentTime.getFullYear()+'-'+Number(currentTime.getMonth()+1)+'-'+currentTime.getDate()+' '+currentTime.getHours()+':'+currentTime.getMinutes()+':'+currentTime.getSeconds()

    // Get wallet and quantity for this ticker
    this.globalVars.getWalletMessage.subscribe(msg => this.wallet = msg);
    this.wallet = this.globalVars.getWallet();


    // Get Ticker
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
            let currentTime = new Date();
            if(Number(currentTime.getHours()) < 6 ||  Number(currentTime.getHours()) > 13){
              this.marketStatus = " Closed on "+ this.formattedTime;
            }
          }
        )
      }

    });
    this.tickerQuery = this.globalVars.getTicker();

    // Get Stock from Global Var
    this.globalVars.getStockDataMessage.subscribe(msg => this.companySummary = msg);
    this.companySummary = this.globalVars.getStockData();

    // Get Quote from Global Var
    this.globalVars.getQuoteDataMessage.subscribe(msg => this.companyQuote = msg);
    this.companyQuote = this.globalVars.getQuoteData();

    this.mongoDbService.getPortfoliolist().toPromise().then(data => {
      this.portfolioData = data[0];
      console.log(this.portfolioData)
      let stocks = this.portfolioData.shares.filter(x => x.ticker==this.companySummary.ticker);
      console.log(stocks)
      let stock =
        {"ticker": this.companySummary.ticker,
        "quantity": 0, "name": this.companySummary.name, "avgCostPerShare": 0, "current_price": 0};
      if(stocks.length>0){
        stock = stocks[0];
      }
      stock.current_price = this.companyQuote.c;
      this.stockModel = stock;
    });

    let time = new Date(this.companyQuote.t * 1000);
    this.formattedTime = time.getFullYear()+'-'+Number(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+'0'+time.getMinutes()+':'+'0'+time.getSeconds();

    if(Number(currentTime.getHours()) < 6 ||  Number(currentTime.getHours()) > 13){
      this.marketStatus = " Closed on "+ this.formattedTime;
    }

    this.mongoDbService.getWatchlist().toPromise().then(data => {
      this.watchList = data;
      let fav = this.watchList.filter(x => x.ticker==this.companySummary.ticker);
      if(fav.length == 0){
        this.isFav ==  false;
      }
      else{
        this.isFav= true;
      }
      // setInterval(this.updateQuotes, 5000);

    });

    //Buy and Sell Alerts
    this.globalVars.alertBuy$.subscribe(message => {
      this.bought = true;
      });
  
      this.globalVars.alertSell$.subscribe(message => {
      this.sold = true;
      });


  }


	openBuyModal(companyQuote) {
		const modalRef = this.modalService.open(CompanyBuyModalComponentComponent);
		modalRef.componentInstance.name = 'Company Buy Modal';
    modalRef.componentInstance.portfolioData = [this.portfolioData, this.stockModel];
	}

  openSellModal(companyQuote) {
    const modalRef = this.modalService.open(CompanySellModalComponent);
		modalRef.componentInstance.name = 'Company Sell Modal';
    modalRef.componentInstance.portfolioData = [this.portfolioData, this.stockModel];
	}

  updateQuotes(){

    // Get Quote Data from APIs and Set Global Var
    let ticker = this.globalVars.getTicker();
    console.log(this.tickerQuery);
    this.apiService.getQuoteData(ticker).toPromise().then(data =>{
    this.companyQuote = data;
    this.globalVars.setQuoteData(this.companyQuote);
    });

    // console.log(this.companyQuote);


    let currentTime = new Date();

    if(Number(currentTime.getHours()) < 6 ||  Number(currentTime.getHours()) > 13){
      this.marketStatus = " Closed on "+ this.formattedTime;
    }

  }


  onFavClick(){

    if(this.isFav == false){
      this.fav = true;
      this.isFav = true;
      this.mongoDbService.addToWatchlist(this.companySummary).toPromise();
    }

    else{
      this.unfav = true;
      this.isFav = false;
      this.mongoDbService.deleteFromWatchlist(this.companySummary.ticker).toPromise();
    }


  }

  ngOnDestroy(){
    this.QuoteSub.unsubscribe();
  }


}
