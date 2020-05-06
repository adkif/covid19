import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss']
})
export class ChartDoughnutComponent implements OnInit {
  allDeaths = [];
  allConfirmed = [];
  allRecovered = [];
  allActive = [];
  mChart;
  canvas: any;
  ctx: any;
  constructor(private covidService: Covid19Service) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    return this.covidService
    .getCountrieData()
    .subscribe( data => {
      data.map(res => this.allDeaths.push(res.Deaths));
      data.map(res => this.allConfirmed.push(res.Confirmed));
      data.map(res => this.allRecovered.push(res.Recovered));
      data.map(res => this.allActive.push(res.Active));
      this.getCanvas();
    });
  }

  public getCanvas() {
    this.canvas = document.getElementById('canvas-doughnut');
    this.ctx = this.canvas.getContext('2d');
    this.mChart = new Chart('canvas-doughnut', {
      type: 'doughnut',
      data: {
        labels: [
          'Confirmed',
          'Deaths',
          'Recovered',
          'Active'
        ],
        datasets: [
          {
            data: [
              this.allConfirmed[this.allConfirmed.length - 1],
              this.allDeaths[this.allDeaths.length - 1],
              this.allRecovered[this.allRecovered.length - 1],
              this.allActive[this.allActive.length - 1],
            ],
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9']
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'left',
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });
  }

}
