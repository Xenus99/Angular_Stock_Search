import { Component, inject } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioBuyModalComponent } from './portfolio-buy-modal/portfolio-buy-modal.component';
import { PortfolioSellModalComponent } from './portfolio-sell-modal/portfolio-sell-modal.component';
import { MongoDbService } from '../mongo-db.service';
import { GlobalVarsService } from '../global-vars.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

  
  // public myStockList = [{ticker: 'AAPL', name:'Apple Inc.', quantity: 3.00, avgCostPerShare: 172.28, totalShare: 0, change: 0, currentPrice: 0, marketValue: 0},
    // {ticker: 'TSLA', name:'Tesla Corp.',  quantity: 4.00, avgCostPerShare: 1500, totalShare: 0, change: 0, currentPrice: 0, marketValue: 0}];

  public myStockList = [];
  wallet: number;
  companyQuote;
  changeStatus = '';
  mongoStockList;

  // Modal Declaration
  private modalService = inject(NgbModal);

  constructor(private apiService: ApiServiceService, private mongoDbService: MongoDbService, private globalVars: GlobalVarsService) { }

  ngOnInit(){

    let count = 0;
    let a = [];
    

      // Get Wallet from Global Var
      this.globalVars.getWalletMessage.subscribe(msg => this.wallet = msg);
      this.wallet = this.globalVars.getWallet();


    this.mongoDbService.getPortfoliolist().toPromise().then(data=>{
      this.mongoStockList = data;



      this.mongoStockList = this.mongoStockList.filter(x => x.ticker);
      console.log(this.wallet);


      for(let stock of this.mongoStockList){
        let obj:any = {};
        obj.ticker = stock.ticker;
        obj.name = stock.name;
        obj.quantity = stock.quantity;
        obj.avgCostPerShare = stock.avgCostPerShare;
        this.myStockList.push(obj);
      }
  
      for(let myStock of this.myStockList){
  
        // Get Quote Data
        let b=this.apiService.getQuoteData(myStock.ticker).toPromise().then(data=>{
          this.companyQuote = data;
    
          this.myStockList[count].currentPrice = this.companyQuote.c;
          this.myStockList[count].change = this.myStockList[count].currentPrice - this.myStockList[count].avgCostPerShare;
          this.myStockList[count].marketValue = this.myStockList[count].currentPrice * this.myStockList[count].quantity;
          this.myStockList[count].totalShare = myStock.avgCostPerShare * myStock.quantity;
    
          a.push(b);
          count++;
        });
      }
   
  
  
      Promise.all(a).then(() => {
  
      });


    });



  }

  openBuyModal(myStock) {
		const modalRef = this.modalService.open(PortfolioBuyModalComponent);
		modalRef.componentInstance.name = 'PortfolioBuyModal';
    modalRef.componentInstance.portfolioData = [this.wallet, myStock];

	}

  openSellModal(myStock) {
		const modalRef = this.modalService.open(PortfolioSellModalComponent);
		modalRef.componentInstance.name = 'PortfolioSellModal';
    modalRef.componentInstance.portfolioData = [this.wallet, myStock];

	}

}
