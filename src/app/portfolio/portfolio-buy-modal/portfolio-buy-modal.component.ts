import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { MongoDbService } from '../../mongo-db.service';


@Component({
  selector: 'app-portfolio-buy-modal',
  templateUrl: './portfolio-buy-modal.component.html',
  styleUrl: './portfolio-buy-modal.component.css'
})
export class PortfolioBuyModalComponent {

	activeModal = inject(NgbActiveModal);
  @Input() portfolioData;

  currentPrice;
  wallet;
  notBuyable: boolean;
  totalBuyable: number;
  quantity: number = 1;
  totalBuy;

	// @Input() name: string;
  constructor(private mongoDbService: MongoDbService) { }

  ngOnInit(){

    this.currentPrice = this.portfolioData[1].currentPrice;
    this.wallet = this.portfolioData[0];
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
    let portfolioData = {ticker: this.portfolioData[1].ticker, name: this.portfolioData[1].name, avgCostPerShare: avg, quantity: newQuantity}
    console.log(portfolioData)
    this.mongoDbService.updateToPortfoliolist(portfolioData).toPromise().then(data =>{console.log(data)});
    this.activeModal.close('Close click');
    // this.soldEvent = true;
  }

}
