import { Component, OnInit, inject } from '@angular/core';
// import { setCompanyData } from '/companydata/companydata.component.ts';
import { GlobalVarsService } from '../global-vars.service';
import { MongoDbService } from '../mongo-db.service'
import { ApiServiceService } from '../api-service.service';
import { CompanyheaderComponent  } from './companyheader/companyheader.component';
import { RouterModule } from  '@angular/router';
import { Subscriber, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl } from "@angular/forms";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit {

  myControl = new FormControl();
  tickerQuery: string;
  companyStock: any;
  companyQuote: any;
  companyCharts: any;
  companySummaryChart: any;
  companySearch: any;
  companyNews: any;
  companyInsider: any;
  companyRecommendation: any;
  companyPeers: any;
  companyEarnings: any;
  loading:  boolean= true;
  autoCompleteLoading: boolean = false;
  options: any;
  spinner: boolean = false;
  tickerFound: boolean = true;
  // options = ['AAPL', 'TSLA', 'NVDA'];

  constructor(private  globalVars: GlobalVarsService,
     private apiService: ApiServiceService,
     private mongoDbService: MongoDbService,
     private route: ActivatedRoute,
     private router: Router
     ) {
    // console.log(this.tickerQuery);

  }


  ngOnInit(): void{
    this.tickerQuery = this.route.snapshot.params['ticker'];
    if (this.tickerQuery != "home"){
      this.onSubmit();
    }
    else{
      this.tickerQuery = "";
    }
    this.myControl.valueChanges.subscribe(value => {
      if (value) {
        this.tickerQuery = value;
        this.onEnteredKey();
      }

    });

  }

  onSubmit(){
    this.loading = true;
    this.spinner = true;
    this.tickerQuery =  this.tickerQuery.toUpperCase();
    let a =[]

    // this.globalVars.getTickerMessage.subscribe(msg => this.tickerQuery = msg);

    // this.tickerQuery = this.route.snapshot.params['ticker'];

    // Get Stock Data
    let b= this.apiService.getStockData(this.tickerQuery).toPromise().then(data=>{

      this.companyStock = data;
      this.globalVars.setStockData(this.companyStock);
    });
    a.push(b);



    // Get Quote Data
    b=this.apiService.getQuoteData(this.tickerQuery).toPromise().then(data=>{

      this.companyQuote = data;
      this.globalVars.setQuoteData(this.companyQuote);



    });
    a.push(b);


    // Get Charts Data
    b=this.apiService.getChartsData(this.tickerQuery).toPromise().then(data=>{
      this.companyCharts = data;
      this.globalVars.setChartsData(this.companyCharts);

    });
    a.push(b);


    // Get Summary Chart Data
    b=this.apiService.getSummaryChartData(this.tickerQuery).toPromise().then(data=>{
      this.companySummaryChart = data;
      this.globalVars.setSummaryChartData(this.companySummaryChart);

    });
    a.push(b);



    // Get Search Data
    b = this.apiService.getSearchData(this.tickerQuery).toPromise().then(data=>{
      // console.warn();
      this.companySearch = data;
      this.globalVars.setSearchData(this.companySearch);

      // console.log(this.companySearch);

    });
    a.push(b);



    // Get News Data
    b=this.apiService.getNewsData(this.tickerQuery).toPromise().then(data=>{
      // console.warn();
      this.companyNews = data;
      this.globalVars.setNewsData(this.companyNews);
    });
    a.push(b);



    // Get Recommendation Data
    b=this.apiService.getRecommendationData(this.tickerQuery).toPromise().then(data=>{
      // console.warn();
      this.companyRecommendation = data;
      this.globalVars.setRecommendationData(this.companyRecommendation);
    });
    a.push(b);


    // Get Insider Data
    b=this.apiService.getInsiderData(this.tickerQuery).toPromise().then(data=>{
      // console.warn();
      this.companyInsider = data;
      this.globalVars.setInsiderData(this.companyInsider);
    });
    a.push(b);



    // Get Peers Data
    b= this.apiService.getPeersData(this.tickerQuery).toPromise().then(data=>{
      // console.warn();
      this.companyPeers = data;
      this.globalVars.setPeersData(this.companyPeers);

    });
    a.push(b);


    // Get Earnings Data
    b=this.apiService.getEarningsData(this.tickerQuery).toPromise().then(data=>{
      // console.warn();
      this.companyEarnings = data;
      this.globalVars.setEarningsData(this.companyEarnings);
    });
    a.push(b);

    b= this.mongoDbService.getPortfoliolist().toPromise().then(data =>{
      let wallet: any = data;
      wallet = wallet.filter(x => x.wallet)
      wallet = wallet[0].wallet;
      this.globalVars.setWallet(wallet);
    });
    a.push(b);


    Promise.all(a).then(() => {
    // console.log(this.globalVars.getStockData());
    // console.log(this.globalVars.getQuoteData());
    // console.log(this.globalVars.getChartsData());
    // console.log(this.globalVars.getNewsData());
    // console.log(this.globalVars.getInsiderData());
    // console.log(this.globalVars.getEarningsData());
    // console.log(this.globalVars.getPeersData());
    // console.log(this.globalVars.getRecommendationData());
    // console.log(this.globalVars.getSearchData());
    this.spinner = false;

    if(Object.keys(this.globalVars.getStockData()).length === 0){
      this.tickerFound = false;
    }
    else{
      this.tickerFound = true;
      this.loading = false;
    }

  });



  }

  onClear(){
    this.router.navigate(['search/home']).then(() => {
        window.location.reload();
    });
  }

  // searchQuery(tickerQuery:string) {
  //   function setCompanyData(tickerQuery);
  // }

  onEnteredKey(){
    this.autoCompleteLoading = true;
    this.options=[];
    this.apiService.getSearchData(this.tickerQuery).toPromise().then((data: {result: any[]})=>{
      // console.warn();
      this.autoCompleteLoading = false;
      this.options = data.result;

      // console.log(this.companySearch);

    });
  }
}
