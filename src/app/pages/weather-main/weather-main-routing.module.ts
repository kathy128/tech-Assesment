import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherListComponent} from './components/weather-list/weather-list.component';


const routes: Routes = [
  {
    path:'',
    component: WeatherListComponent,
    canActivate:[]

  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherMainRoutingModule { }
