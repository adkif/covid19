import { Component, OnInit, ViewChild } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Covid } from '../classes/covid';
import { ICovid } from '../classes/icovid';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  today: Covid;
  data: ICovid[];
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

  constructor(private covidService: Covid19Service) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.today = new Covid( 0, 0, 0, 0);
    this.data = [];
    return this.covidService.getCountrieData()
    .subscribe(countries => {
        this.data = countries;
        this.getVariation();
      }
    );
  }

  getVariation() {
    const dayData = this.data[this.data.length - 1];
    this.today.setActive(dayData.Active);
    this.today.setConfirmed(dayData.Confirmed);
    this.today.setDeaths(dayData.Deaths);
    this.today.setRecovered(dayData.Recovered);
    this.confirmed = this.today.getConfirmed() - this.data[this.data.length - 2].Confirmed;
    this.active = this.today.getAcive() - this.data[this.data.length - 2].Active;
    this.recovered = this.today.getRecovered() - this.data[this.data.length - 2].Recovered;
    this.deaths = this.today.getDeaths() - this.data[this.data.length - 2].Deaths;
    this.acr = this.getRate(dayData.Active,  dayData.Confirmed);
    this.dr = this.getRate(dayData.Deaths,  dayData.Confirmed);
    this.rr = this.getRate(dayData.Recovered,  dayData.Confirmed);
    this.lu = dayData.Date;
    this.dataSource =  new MatTableDataSource<ICovid>(this.data.reverse());
    this.dataSource.paginator = this.paginator;
  }

  getRate(value: number, total: number) {
    return value * 100 / total;
  }
}
