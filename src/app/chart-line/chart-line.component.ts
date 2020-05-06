import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {
  allDates = [];
  allConfirmed = [];
  allDeaths = [];
  allRecovered = [];
  allActive = [];
  chart;
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
      data.map(res => this.allDates.push(res.Date));
      data.map(res => this.allConfirmed.push(res.Confirmed));
      data.map(res => this.allDeaths.push(res.Deaths));
      data.map(res => this.allRecovered.push(res.Recovered));
      data.map(res => this.allActive.push(res.Active));
      this.getCanvas();
    });
  }

  public getCanvas() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.allDates,
        datasets: [
          {
            data: this.allConfirmed,
            borderColor: '#3cba9f',
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}
