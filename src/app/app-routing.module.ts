import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', redirectTo: 'search/home', pathMatch: 'full'},
  { path: 'search', redirectTo: 'search/home', pathMatch: 'full'},
  { path: 'search/home', redirectTo: 'search/home', pathMatch: 'full'},
  { path:'search/:ticker', component: SearchComponent },  
  { path:'watchlist', component: WatchlistComponent },
  { path:'portfolio', component: PortfolioComponent }
  // { path: '', redirectTo: 'search/home', pathMatch: 'full'},
  // { path: 'search', redirectTo: 'search/home', pathMatch: 'full'},
  // {path: 'search/home', component: SearchComponent},

  // {path: 'search', component: SearchComponent},
  // {path: 'search/:ticker', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
  ],
})


export class AppRoutingModule { }
