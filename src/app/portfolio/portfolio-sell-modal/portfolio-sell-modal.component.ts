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

    this.currentPrice = this.portfolioData[1].currentPrice;
    this.myQuantity = this.portfolioData[1].quantity;
    this.wallet = this.portfolioData[0];
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

    if(this.quantity == this.portfolioData[1].quantity){
      this.mongoDbServices.deleteFromPortfoliolist(this.portfolioData[1].ticker).toPromise().then(data =>{
        this.globalVars.setWallet(this.wallet);
      });
    }
    else{
      this.mongoDbServices.updateToPortfoliolist({ quantity: this.portfolioData[1].quantity, avgCostPerShare:  this.portfolioData[1].avgCostPerShare }).toPromise().then(data =>{
        this.globalVars.setWallet(this.wallet);
      });
    }


    this.activeModal.close('Close click');
    // this.soldEvent = true;
  }


}
