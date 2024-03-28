import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVarsService } from '../global-vars.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  ticker: string = 'home';

  constructor(private router: Router, private globalVars: GlobalVarsService) { }

  ngOnInit(){
    
    this.ticker = this.globalVars.getTicker();
  }


  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

}
