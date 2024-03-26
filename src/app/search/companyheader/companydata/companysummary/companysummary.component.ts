import { Component, inject, Input } from '@angular/core';
import { ApiServiceService }  from '../../../../api-service.service';
import * as Highcharts from 'highcharts/highstock';
import { GlobalVarsService } from '../../../../global-vars.service';
import { Router } from '@angular/router';


//Summary Component
@Component({
  selector: 'app-companysummary',
  templateUrl: './companysummary.component.html',
  styleUrl: './companysummary.component.css'
})

export class CompanysummaryComponent {

  title = 'Company Summary';
  companySummary: any;
  companyPeers: any;
  companySummaryChart: any;
  companyQuote: any;


  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options;
  data = [];
  hourData = [];


  constructor(private apiService : ApiServiceService, private globalVars : GlobalVarsService, private router: Router) { }

  ngOnInit(){

        // Get Stock from Global Var
        this.globalVars.getStockDataMessage.subscribe(msg => this.companySummary = msg);
        this.companySummary = this.globalVars.getStockData();

        // Get Quote from Global Var
        this.globalVars.getQuoteDataMessage.subscribe(msg => this.companyQuote = msg);
        this.companyQuote = this.globalVars.getQuoteData();
        // console.log("Company Quote Data in Chart Component: ",this.companyQuote);

        // Get Summary Chart from Global Var
        this.globalVars.getSummaryChartDataMessage.subscribe(msg => this.companySummaryChart = msg);
        this.companySummaryChart = this.globalVars.getSummaryChartData();

        // Get Peers from Global Var
        this.globalVars.getPeersDataMessage.subscribe(msg => this.companyPeers = msg);
        this.companyPeers = this.globalVars.getPeersData();

        this.alignChartData();
        this.setCharts();

  }


  alignChartData(){
    // for(let obj of this.companySummaryChart.results){
    //     this.data.push(Number(obj.c));
    //     let  dateObj = new Date(obj.t * 1000);
    //     this.hourData.push(Number(dateObj.getHours()));
    //
    //     // console.log(obj.c);
    // }
    this.data = this.companySummaryChart.results.map((obj: any) => [obj.t, obj.c]);

  }


  setCharts(){
    this.chartOptions = {
        title: {
            text: this.companySummary.ticker + ' Hourly Price Variation',
            align: 'center',
            style: {
                fontSize: '15px' // Change the size of the title here
            }
        },
        yAxis: {
            title: {
                text: 'Price' // Change the label of the y-axis here
            }
        },
      xAxis: {
        type: 'datetime',
      },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
      legend:{ enabled:false},
        series: [{
            name: '',
            type: 'line',
            data: this.data,
            color: (this.companyQuote.d>=0) ? 'green' : 'red',
          tooltip: {
            valueDecimals: 2
          }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }; // required
    }




    onPeerClick(peer){
        this.router.navigate(['search/'+peer]).then(() => {
            window.location.reload();
        });
    }


}
