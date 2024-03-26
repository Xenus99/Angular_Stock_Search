import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { MongoDbService } from '../../../mongo-db.service';

@Component({
  selector: 'app-company-buy-modal-component',
  templateUrl: './company-buy-modal-component.component.html',
  styleUrl: './company-buy-modal-component.component.css'
})
export class CompanyBuyModalComponentComponent {
	activeModal = inject(NgbActiveModal);
  @Input () buyModalData;

  currentPrice;
  wallet;
  notBuyable: boolean;
  totalBuyable: number;
  quantity: number = 1;
  totalBuy;

  constructor(private mongoDbService: MongoDbService) { }

  ngOnInit(){

    // console.log(this.buyModalData);
    this.currentPrice = this.buyModalData[1].c;
    this.wallet = this.buyModalData[0];
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

    this.mongoDbService.getPortfoliolist().toPromise().then(data => {
      let portfolio: any = data;
      let owned = portfolio.filter(x => x.ticker == this.buyModalData.ticker);
      if(owned.length == 0){
        this.mongoDbService.addToPortfoliolist({ticker: this.buyModalData[1].ticker, name: this.buyModalData[1].name, quantity: this.buyModalData[1].quantity, avgPricePerShare: this.buyModalData[1].currentPrice})
      }
      else{
        let newQuantity = this.quantity + this.buyModalData[1].quantity;
        let avg = ((this.quantity * this.currentPrice) + (this.buyModalData[1].quantity * this.buyModalData[1].avgCostPerShare))/newQuantity;
        this.mongoDbService.updateToPortfoliolist({quantity: newQuantity, avgPricePerShare: avg})
      }
    });
    



    this.activeModal.close('Close click');
    // this.soldEvent = true;
  }
}
