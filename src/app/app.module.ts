import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from "@angular/cdk/table";
import {AppComponent} from './app.component';
import {WeatherMainComponent} from './pages/weather-main/weather-main.component';
import {WeatherMainRoutingModule} from './pages/weather-main/weather-main-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared/shared.module';
import {HeaderComponent} from './shared/components/organism/header/header.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    CdkTableModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    WeatherMainComponent,
    WeatherMainRoutingModule,
    HeaderComponent,
  ],
})

export class AppModule { }
