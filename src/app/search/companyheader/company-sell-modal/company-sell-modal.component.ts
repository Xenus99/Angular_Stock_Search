import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVarsService } from '../../../global-vars.service';
import { MongoDbService } from '../../../mongo-db.service';

@Component({
  selector: 'app-company-sell-modal',
  templateUrl: './company-sell-modal.component.html',
  styleUrl: './company-sell-modal.component.css'
})
export class CompanySellModalComponent {


  activeModal = inject(NgbActiveModal);
  @Input() buyModalData;

  currentPrice;
  myQuantity;
  wallet = 238.00;
  notSellable: boolean;
  totalSellable: number;
  quantity: number = 1;
  totalSell;
  // boughtEvent: boolean = false;
  // soldEvent: boolean = false;


	// @Input() name: string;

  constructor(private globalVars: GlobalVarsService, private mongoDbServices: MongoDbService) { }

  ngOnInit(){

    this.wallet = this.buyModalData[0];
    this.currentPrice = this.buyModalData[1].c;
    this.myQuantity = this.buyModalData[2];
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

    if(this.quantity == this.buyModalData[1].quantity){
      this.mongoDbServices.deleteFromPortfoliolist(this.buyModalData[1].ticker).toPromise().then(data =>{
        this.globalVars.setWallet(this.wallet);
      });
    }
    else{
      let newQuantity = this.buyModalData[1].quantity - this.quantity;
      this.mongoDbServices.updateToPortfoliolist({ quantity: newQuantity, avgCostPerShare:  this.buyModalData[1].avgCostPerShare }).toPromise().then(data =>{
        this.globalVars.setWallet(this.wallet);
      });
    }

    this.activeModal.close('Close click');
    // this.soldEvent = true;
  }



}
