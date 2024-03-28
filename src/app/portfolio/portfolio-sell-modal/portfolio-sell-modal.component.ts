import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { MongoDbService } from '../../mongo-db.service';
import { GlobalVarsService } from '../../global-vars.service';


@Component({
  selector: 'app-portfolio-sell-modal',
  templateUrl: './portfolio-sell-modal.component.html',
  styleUrl: './portfolio-sell-modal.component.css'
})
export class PortfolioSellModalComponent {

  activeModal = inject(NgbActiveModal);
  @Input() portfolioData;

  currentPrice;
  myQuantity;
  wallet;
  notSellable: boolean;
  totalSellable: number;
  quantity: number = 1;
  totalSell;
  // boughtEvent: boolean = false;
  // soldEvent: boolean = false;


	// @Input() name: string;

  constructor(private globalVars: GlobalVarsService, private mongoDbServices: MongoDbService) { }

  ngOnInit(){
    this.currentPrice = this.portfolioData[1].current_price;
    this.myQuantity = this.portfolioData[1].quantity;
    this.wallet = this.portfolioData[0].balance;
    this.totalSell = (this.quantity * this.currentPrice).toFixed(2);
    this.totalSellable = this.myQuantity;
    this.notSellable = (this.quantity > this.myQuantity) ? true : false ;

  }

  onKeyup(event){

    this.totalSell = (this.quantity * this.currentPrice).toFixed(2);
    this.totalSellable = this.myQuantity;
    this.notSellable = (this.quantity > this.myQuantity) ? true : false ;

  }

  sellStock(){
    let newQuantity =  this.portfolioData[1].quantity - this.quantity;
    let avg = ((this.portfolioData[1].quantity * this.portfolioData[1].avgCostPerShare) - (this.quantity * this.currentPrice))/newQuantity;
    this.portfolioData[1].quantity = newQuantity;
    this.portfolioData[1].avgCostPerShare = avg;
    this.portfolioData[0].balance = this.wallet + (this.quantity * this.currentPrice);
    if(this.portfolioData[1].quantity == 0){
      this.portfolioData[0].shares = this.portfolioData[0].shares.filter(stock => stock.ticker !== this.portfolioData[1].ticker);
    }
    console.log(this.portfolioData[0])
    this.mongoDbServices.updateToPortfoliolist(this.portfolioData[0]).toPromise().then(data =>{console.log(data)});
    this.globalVars.showSellAlert('Stock sold successfully!');
    this.activeModal.close('Close click');
    // this.soldEvent = true;
  }


}
