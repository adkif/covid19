import { Component, OnInit, ViewChild } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Covid } from '../classes/covid';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  today: Covid;
  data: Covid[];
  displayedColumns: string[] = ['Date', 'Confirmed', 'Deaths', 'Recovered', 'Active'];
  dataSource: any;
  recovered: number;
  active: number;
  deaths: number;
  confirmed: number;
  acr: number;
  rr: number;
  dr: number;
  lu: string;
  isLoading = true;

  constructor(private covidService: Covid19Service) { }

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.today = new Covid( 0, 0, 0, 0, '');
    this.data = [];
    return this.covidService.getCountrieData()
    .subscribe(countries => {
        countries.map( day =>
          this.data.push(new Covid(day.Confirmed, day.Deaths, day.Recovered, day.Active, day.Date)
        ));
        this.getVariation();
      }
    );
  }

  getVariation() {
    const dayData = this.data[this.data.length - 1];
    this.today.setActive(dayData.getActive());
    this.today.setConfirmed(dayData.getConfirmed());
    this.today.setDeaths(dayData.getDeaths());
    this.today.setRecovered(dayData.getRecovered());
    this.confirmed = this.today.getConfirmed() - this.data[this.data.length - 2].getConfirmed();
    this.active = this.today.getActive() - this.data[this.data.length - 2].getActive();
    this.recovered = this.today.getRecovered() - this.data[this.data.length - 2].getRecovered();
    this.deaths = this.today.getDeaths() - this.data[this.data.length - 2].getDeaths();
    this.acr = this.getRate(dayData.getActive(),  dayData.getConfirmed());
    this.dr = this.getRate(dayData.getDeaths(),  dayData.getConfirmed());
    this.rr = this.getRate(dayData.getRecovered(),  dayData.getConfirmed());
    this.lu = dayData.getLastUpdate();
    this.dataSource =  new MatTableDataSource<Covid>(this.data.reverse());
    this.isLoading = false;
  }

  getRate(value: number, total: number) {
    return value * 100 / total;
  }
}
