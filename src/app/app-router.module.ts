import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/weather-main/weather-main.module').then((m) => m.WeatherMainModule),
    canActivate: [],
  },
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
