import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherListComponent} from './components/weather-list/weather-list.component';
import {WeatherMainComponent} from './weather-main.component';


const routes: Routes = [
  {
    path:'',
    component: WeatherMainComponent,
    children:[
      {
        path:'',
        component: WeatherListComponent,
      }
    ]},
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherMainRoutingModule { }
