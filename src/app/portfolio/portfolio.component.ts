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
  portfolioData: any;
  changeStatus = '';
  loading = false;
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
      this.UpdateStockList();
  }

  UpdateStockList(){
    this.mongoDbService.getPortfoliolist().toPromise().then(data=>{
      this.portfolioData = data[0];
      this.loading = true;
      Promise.all(this.portfolioData.shares.map((share: any) => this.apiService.getQuoteData(share.ticker).toPromise())).then(
        (data: any[]) =>{
          this.portfolioData.shares.forEach((stock: any, index: number) => {

            stock.current_price = data[index].c;
            stock.change = stock.current_price - stock.avgCostPerShare;
            stock.marketValue = (stock.current_price * stock.quantity).toFixed(2);
            console.log(stock.marketValue)
            stock.totalShare = (stock.avgCostPerShare * stock.quantity).toFixed(2);
          });
          this.loading = false;
        })});
  }

  openBuyModal(myStock) {
		const modalRef = this.modalService.open(PortfolioBuyModalComponent);
		modalRef.componentInstance.name = 'PortfolioBuyModal';
    modalRef.componentInstance.portfolioData = [this.portfolioData, myStock];
    modalRef.result.then((result) => {console.log(2, this.portfolioData)});

	}

  openSellModal(myStock) {
		const modalRef = this.modalService.open(PortfolioSellModalComponent);
		modalRef.componentInstance.name = 'PortfolioSellModal';
    modalRef.componentInstance.portfolioData = [this.portfolioData, myStock];
    modalRef.result.then((result) => {console.log(2, this.portfolioData)});

	}

}
