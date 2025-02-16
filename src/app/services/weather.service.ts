import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  ResponseDataInterface,
  ResponseOverviewInterface,
  WeatherParamsInterface
} from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(body: WeatherParamsInterface): Observable<ResponseDataInterface | any> {
    let params = new HttpParams().set('lat' , body.lat).set('lon' , body.lon)
    params = params.set('appid', environment.apiKey)
    if(body.exclude) params = params.set('exclude' , body.exclude)
    if(body.units) params = params.set('units' , body.units)

    const url = `${environment.apiUrl}`;
    return this.http.get(url, {params}).pipe(
      catchError(error => {
        console.error('Error al obtener el clima', error);
        return throwError(error);
      })
    );
  }
  getOverview(body: WeatherParamsInterface): Observable<ResponseOverviewInterface | any> {
    let params = new HttpParams().set('lat' , body.lat).set('lon' , body.lon)
    params = params.set('appid', environment.apiKey)
    if(body.units) params = params.set('units' , body.units)
    const url = `${environment.apiUrl}/overview`;
    return this.http.get(url, {params}).pipe(
      catchError(error => {
        console.error('Error al obtener el clima', error);
        return throwError(error);
      })
    );
  }
}
