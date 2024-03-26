import { Component } from '@angular/core';
import { ApiServiceService } from '../../../../api-service.service';
import * as Highcharts from 'highcharts/highstock';
import { GlobalVarsService } from '../../../../global-vars.service';


@Component({
  selector: 'app-companyinsights',
  templateUrl: './companyinsights.component.html',
  styleUrl: './companyinsights.component.css'
})
export class CompanyinsightsComponent {
  tickerQuery: string = 'AAPL';

  title = 'Company Insights';

  companyRecommendation: any;
  companyEarnings: any;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart';
  chartOptionsRec: Highcharts.Options;
  chartOptionsEPS: Highcharts.Options;
  
  insider: any;
  companyInsider: any;

  totalMSPR: number;
  positiveMSPR: number;
  negativeMSPR: number;

  totalChange: number;
  positiveChange: number;
  negativeChange: number;


  constructor(private apiService : ApiServiceService, private globalVars : GlobalVarsService) {

  }


  ngOnInit(){

        // Get Insider Data
        // this.apiService.getInsiderData(this.tickerQuery).subscribe(data=>{
        //     // console.warn();
        //     this.insider = data;
        //   });


        // Get Insider Data
        this.globalVars.getInsiderDataMessage.subscribe(msg => this.companyInsider = msg);
        this.insider = this.globalVars.getInsiderData();

        // Get Recommendation Data
        this.globalVars.getRecommendationDataMessage.subscribe(msg => this.companyRecommendation = msg);
        this.companyRecommendation = this.globalVars.getRecommendationData();     
      
        // Get Earnings Data
        this.globalVars.getEarningsDataMessage.subscribe(msg => this.companyEarnings = msg);
        this.companyEarnings = this.globalVars.getEarningsData();     
      
          // Setup insider data
          let positiveMSPRs: number[] = this.insider.data.filter((i:any): boolean=> i.mspr >= 0);
          let negativeMSPRs: number[] = this.insider.data.filter((i:any): boolean => i.mspr < 0);
          let positiveChanges: number[] = this.insider.data.filter((i:any): boolean=> i.change >= 0);
          let negativeChanges: number[] = this.insider.data.filter((i:any): boolean=> i.change < 0);
      
          this.companyInsider ={
            // symbol: this.insider.symbol,
            totalMSPR: this.insider.data.reduce((acc:any, i:any) => acc+i.mspr, 0).toFixed(2),
            totalChange: this.insider.data.reduce((acc:any, i:any) => acc+i.change, 0).toFixed(2),
            positiveMSPR: positiveMSPRs.reduce((acc:any, i:any) => acc+i.mspr, 0).toFixed(2),
            negativeMSPR: negativeMSPRs.reduce((acc:any, i:any) => acc+i.mspr, 0).toFixed(2),
            positiveChange: positiveChanges.reduce((acc:any, i:any) => acc+i.change, 0).toFixed(2),
            negativeChange: negativeChanges.reduce((acc:any, i:any) => acc+i.change, 0).toFixed(2),
          };

          this.setRecommendationChart();
          this.setEPSChart();
      

  }



    // Recommendation Charts

  setRecommendationChart(){
    this.chartOptionsRec = {
        chart: {
            type: 'column',
            backgroundColor: '#f0f0f0'
        },
        title: {
            text: 'Recommendation Trends',
            align: 'center'
        },
        xAxis: {
            categories: [this.companyRecommendation[0].period.slice(0,7), this.companyRecommendation[1].period.slice(0,7), this.companyRecommendation[2].period.slice(0,7), this.companyRecommendation[3].period.slice(0,7)]
        },
        yAxis: {
            min: 0,
            title: {
                text: '#Analysis'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>', // Display numbers instead of percentages
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    format: '{point.y}' // Display numbers instead of percentages
                },
                colors: [
                    '#063b01', // Strong Buy
                    '#02a842', // Buy
                    '#876e00', // Hold
                    '#db4e02', // Sell
                    '#400b01'  // Strong Sell
                ]
            }
        },
        series: [{
            type: 'column',
            name: 'Strong Buy',
            color:'#063b01',
            data: [this.companyRecommendation[0].strongBuy, this.companyRecommendation[1].strongBuy, this.companyRecommendation[2].strongBuy, this.companyRecommendation[3].strongBuy]
        }, {
            type: 'column',
            name: 'Buy',
            color:'#02a842',
            data: [this.companyRecommendation[0].buy, this.companyRecommendation[1].buy, this.companyRecommendation[2].buy, this.companyRecommendation[3].buy]
        }, {
            type: 'column',
            name: 'Hold',
            color:'#876e00',
            data: [this.companyRecommendation[0].hold, this.companyRecommendation[1].hold, this.companyRecommendation[2].hold, this.companyRecommendation[3].hold]
        }, {
            type: 'column',
            name: 'Sell',
            color:'#db4e02',
            data: [this.companyRecommendation[0].sell, this.companyRecommendation[1].sell, this.companyRecommendation[2].sell, this.companyRecommendation[3].sell]
        },{
            type: 'column',
            name: 'Strong Sell',
            color:'#400b01',
            data: [this.companyRecommendation[0].strongSell, this.companyRecommendation[1].strongSell, this.companyRecommendation[2].strongSell, this.companyRecommendation[3].strongSell]
        }]
    }; // required
  }
    
  
  
  
    //EPS Chart
    setEPSChart(){
    // Highcharts: typeof Highcharts = Highcharts; // required
    // chartConstructor = 'chart'; // optional string, defaults to 'chart'
    this.chartOptionsEPS = {
        chart: {
            type: 'spline',
            inverted: false,
            backgroundColor: '#f0f0f0'
        },
        title: {
            text: 'EPS Surprises',
            align: 'center'
        },
        xAxis: {
            reversed: false,
            title: {
                text: ''
            },
            labels: {
                format: '{value}',
                style: {
                    fontSize: '70%' // Adjust the font size as needed
                }
            },
            maxPadding: 0.05,
            showLastLabel: true,
            categories: [
                this.companyEarnings[0].period + '<br>Surprise: ' + this.companyEarnings[0].surprise,
                this.companyEarnings[1].period + '<br>Surprise: ' + this.companyEarnings[1].surprise,
                this.companyEarnings[2].period + '<br>Surprise: ' + this.companyEarnings[2].surprise,
                this.companyEarnings[3].period + '<br>Surprise: ' + this.companyEarnings[3].surprise
            ]
        },
        yAxis: {
            title: {
                text: 'Quarterly Surprises'
            },
            labels: {
                format: '{value}'
            },
            lineWidth: 0
        },
        legend: {
            enabled: true
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x}: {point.y}'
        },
        plotOptions: {
            spline: {
                marker: {
                    // enable: false
                }
            }
        },
        series: [{
            name: 'Actual',
            type: 'spline',
            data: [
                [this.companyEarnings[0].period, this.companyEarnings[0].actual],
                [this.companyEarnings[1].period, this.companyEarnings[1].actual],
                [this.companyEarnings[2].period, this.companyEarnings[2].actual],
                [this.companyEarnings[3].period, this.companyEarnings[3].actual]
            ]
        }, {
            name: 'Estimate',
            type: 'spline',
            data: [
                [this.companyEarnings[0].period, this.companyEarnings[0].estimate],
                [this.companyEarnings[1].period, this.companyEarnings[1].estimate],
                [this.companyEarnings[2].period, this.companyEarnings[2].estimate],
                [this.companyEarnings[3].period, this.companyEarnings[3].estimate]
            ]
        }]
    };
}
    
  
  
  
  
  






}
