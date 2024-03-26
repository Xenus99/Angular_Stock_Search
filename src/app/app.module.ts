import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';
import { MatAutocompleteModule } from  '@angular/material/autocomplete';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CompanyheaderComponent } from './search/companyheader/companyheader.component';
import { CompanydataComponent } from './search/companyheader/companydata/companydata.component';
import { CompanysummaryComponent } from './search/companyheader/companydata/companysummary/companysummary.component';
import { CompanynewsComponent } from './search/companyheader/companydata/companynews/companynews.component';
import { CompanychartsComponent } from './search/companyheader/companydata/companycharts/companycharts.component';
import { CompanyinsightsComponent } from './search/companyheader/companydata/companyinsights/companyinsights.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanyBuyModalComponentComponent } from './search/companyheader/company-buy-modal-component/company-buy-modal-component.component';
import { NewsModalComponent } from './search/companyheader/companydata/companynews/news-modal/news-modal.component';
import { PortfolioBuyModalComponent } from './portfolio/portfolio-buy-modal/portfolio-buy-modal.component';
import { PortfolioSellModalComponent } from './portfolio/portfolio-sell-modal/portfolio-sell-modal.component';
import { CompanySellModalComponent } from './search/companyheader/company-sell-modal/company-sell-modal.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    FooterComponent,
    NavbarComponent,
    SearchComponent,
    WatchlistComponent,
    PortfolioComponent,
    CompanyheaderComponent,
    CompanydataComponent,
    CompanysummaryComponent,
    CompanynewsComponent,
    CompanychartsComponent,
    CompanyinsightsComponent,
    CompanyBuyModalComponentComponent,
    NewsModalComponent,
    PortfolioBuyModalComponent,
    PortfolioSellModalComponent,
    CompanySellModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatProgressSpinner,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
