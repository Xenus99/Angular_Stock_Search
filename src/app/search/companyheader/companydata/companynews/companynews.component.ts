import { Component, Input, inject } from '@angular/core';
import {ApiServiceService} from '../../../../api-service.service';
import { GlobalVarsService } from '../../../../global-vars.service';
import { NewsModalComponent } from './news-modal/news-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-companynews',
  templateUrl: './companynews.component.html',
  styleUrl: './companynews.component.css'
})
export class CompanynewsComponent {

  // @Input() ticker: string= "";

  private modalService = inject(NgbModal);


  title = 'Company News';
  companyNews: any= [];
  companyNews1: any; 
  companyNews2: any;
  filteredNews: number[];
  constructor(private globalVars : GlobalVarsService) {

  }

  ngOnInit(){

    // Get News from Global Var
    this.globalVars.getNewsDataMessage.subscribe(msg => this.companyNews = msg);
    this.companyNews = this.globalVars.getNewsData();

    this.filteredNews = this.companyNews.filter((i:any): boolean=> i.image != "");
    // console.log(whis.filteredNews);
    // this.companyNews1 = filteredNews.slice(0, 10);
    // this.companyNews2 = filteredNews.slice(10, 20);

  }

  openNewsModal(news) {

		const modalRef = this.modalService.open(NewsModalComponent);
		modalRef.componentInstance.name = 'News Modal';
    modalRef.componentInstance.newsData = news;

    
	}
}
