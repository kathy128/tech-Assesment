import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from "@angular/cdk/table";
import {WeatherListComponent} from './components/weather-list/weather-list.component';
import {WeatherMainComponent} from './weather-main.component';
import {WeatherMainRoutingModule} from './weather-main-routing.module';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: []
  ,
  imports: [
    CommonModule,
    CdkTableModule,
    SharedModule,
    WeatherListComponent,
    WeatherMainRoutingModule,
  ],
})

export class WeatherMainModule { }
