import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrl: './news-modal.component.css'
})
export class NewsModalComponent {


	activeModal = inject(NgbActiveModal);
  formattedData;
  months = ['','January','February','March','April','May','June','July','August','September','October','November','December'];

  @Input() newsData;
  
  ngOnInit(){

    console.log(this.newsData.datetime);
    let time = new Date(this.newsData.datetime * 1000);
    console.log(time);
    this.formattedData = this.months[time.getMonth()]+' '+time.getDate()+', '+time.getFullYear();    

  }

}


