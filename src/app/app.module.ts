import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { ChartDoughnutComponent } from './chart-doughnut/chart-doughnut.component';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { Covid19Service } from './services/covid19.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartDoughnutComponent,
    ChartLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [Covid19Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
