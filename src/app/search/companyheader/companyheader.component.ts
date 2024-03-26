import { Component, Input, OnInit, inject } from '@angular/core';
import { GlobalVarsService } from '../../global-vars.service';
import{ ApiServiceService } from '../../api-service.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyBuyModalComponentComponent } from './company-buy-modal-component/company-buy-modal-component.component';
import { CompanySellModalComponent } from './company-sell-modal/company-sell-modal.component';
import { MongoDbService } from '../../mongo-db.service';



@Component({
  selector: 'app-companyheader',
  templateUrl: './companyheader.component.html',
  styleUrl: './companyheader.component.css'
})

export class CompanyheaderComponent implements OnInit{

  route: ActivatedRoute = inject(ActivatedRoute);
  tickerQuery: string;
  companySummary: any;
  companyQuote: any;
  formattedTime;
  marketStatus: string = ' is Open';
  wallet: number;
  myQuantity;
  isFav: boolean = false;
  watchList;
  
  title = 'Company Data';

  // Modal Declaration
  private modalService = inject(NgbModal);


  constructor(private  globalVars: GlobalVarsService, private apiService :ApiServiceService, private mongoDbService: MongoDbService) { }

  ngOnInit(){

    let currentTime = new Date();
    
    // Get wallet and quantity for this ticker
    this.globalVars.getWalletMessage.subscribe(msg => this.wallet = msg);
    this.wallet = this.globalVars.getWallet();


    // Get Ticker
    this.globalVars.getTickerMessage.subscribe(msg => this.tickerQuery = msg);
    this.companySummary = this.globalVars.getTicker();
    
    // Get Stock from Global Var
    this.globalVars.getStockDataMessage.subscribe(msg => this.companySummary = msg);
    this.companySummary = this.globalVars.getStockData();

    // Get Quote from Global Var
    this.globalVars.getQuoteDataMessage.subscribe(msg => this.companyQuote = msg);
    this.companyQuote = this.globalVars.getQuoteData();

    let time = new Date(this.companyQuote.t * 1000);
    this.formattedTime = time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()+' '+time.getHours()+':'+'0'+time.getMinutes()+':'+'0'+time.getSeconds();

    if(Number(currentTime.getHours()) < 6 ||  Number(currentTime.getHours()) > 13){
      this.marketStatus = " Closed on "+ this.formattedTime;
    }

    this.mongoDbService.getWatchlist().toPromise().then(data => {
      let fav: any;
      this.watchList = data;
      fav = fav.filter(x => x.ticker==this.companySummary.ticker);
      if(fav.length == 0){
        this.isFav ==  false;
      }
      else{
        this.isFav= true;
      }
    });


    setInterval(this.updateQuotes, 15000);
    
  }


	openBuyModal(companyQuote) {
		const modalRef = this.modalService.open(CompanyBuyModalComponentComponent);
		modalRef.componentInstance.name = 'Company Buy Modal';
    modalRef.componentInstance.buyModalData = [this.wallet, companyQuote];
	}

  openSellModal(companyQuote) {
    const modalRef = this.modalService.open(CompanySellModalComponent);
		modalRef.componentInstance.name = 'Company Sell Modal';
    modalRef.componentInstance.buyModalData = [this.wallet, companyQuote, this.myQuantity];
	}

  updateQuotes(){

    // Get Quote Data from APIs and Set Global Var

    this.apiService.getQuoteData(this.tickerQuery).toPromise().then(data =>{
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
      this.isFav = true;
      this.mongoDbService.addToWatchlist(this.companySummary).toPromise();
    }

    else{
      this.isFav = false;
      this.mongoDbService.deleteFromWatchlist(this.companySummary.ticker).toPromise();
    }

  
  }
  

}
