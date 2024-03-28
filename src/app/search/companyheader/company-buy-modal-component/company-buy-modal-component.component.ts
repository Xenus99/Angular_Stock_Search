import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { MongoDbService } from '../../../mongo-db.service';
import { GlobalVarsService } from '../../../global-vars.service';

@Component({
  selector: 'app-company-buy-modal-component',
  templateUrl: './company-buy-modal-component.component.html',
  styleUrl: './company-buy-modal-component.component.css'
})
export class CompanyBuyModalComponentComponent {
	activeModal = inject(NgbActiveModal);
  @Input () portfolioData;

  currentPrice;
  wallet;
  notBuyable: boolean;
  totalBuyable: number;
  quantity: number = 1;
  totalBuy;

  constructor(private mongoDbService: MongoDbService, private globalVars: GlobalVarsService) { }

  ngOnInit(){

    // console.log(this.buyModalData);
    this.currentPrice = this.portfolioData[1].current_price;
    this.wallet = this.portfolioData[0].balance;
    this.totalBuy = (this.quantity * this.currentPrice).toFixed(2);
    this.totalBuyable = Math.floor(this.wallet / this.currentPrice);
    this.notBuyable = (this.totalBuy > this.wallet) ? true : false ;

  }

  onKeyup(event){

    this.totalBuy = (this.quantity * this.currentPrice).toFixed(2);
    this.totalBuyable = Math.floor(this.wallet / this.currentPrice);
    this.notBuyable = (this.totalBuy > this.wallet) ? true : false ;

  }

  buyStock(){
    let newQuantity = this.quantity + this.portfolioData[1].quantity;
    let avg = ((this.quantity * this.currentPrice) + (this.portfolioData[1].quantity * this.portfolioData[1].avgCostPerShare))/newQuantity;
    this.portfolioData[1].quantity = newQuantity;
    this.portfolioData[1].avgCostPerShare = avg;
    this.portfolioData[0].balance = this.wallet - (this.quantity * this.currentPrice);
    if(!this.portfolioData[0].shares.some((stock: any) => stock.ticker === this.portfolioData[1].ticker)){
      this.portfolioData[0].shares.push(this.portfolioData[1]);
    }
    this.mongoDbService.updateToPortfoliolist(this.portfolioData[0]).toPromise().then(data =>{console.log(data)});
    this.globalVars.showBuyAlert('Stock bought successfully!');
    this.activeModal.close('Close click');
  }
}
