import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../../../services/weather.service';
import {TableComponent} from '../../../../shared/components/organism/table/table.component';
import {CommonModule} from '@angular/common';
import {ResponseDataInterface, TableDataInterface} from '../../../../interfaces/weather.interface';
import {finalize, tap} from 'rxjs';
import {LoadingComponent} from '../../../../shared/components/atoms/loading/loading.component';
import {CardComponent} from '../../../../shared/components/atoms/card/card.component';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  templateUrl: './weather-list.component.html',
  imports: [
    TableComponent,
    CommonModule,
    LoadingComponent,
    CardComponent,
  ],
  styleUrl: './weather-list.component.scss'
})
export class WeatherListComponent implements OnInit{
  constructor(private weatherService: WeatherService, private cd: ChangeDetectorRef) {
  }
  public options: {id: number, title: string}[] = [
    {id: 0, title: 'Days'},
    {id: 1, title: 'Hours'},
  ];
  public displayedData:  TableDataInterface[]
  private generalData: ResponseDataInterface;
  public selected: string = 'days' ;
  loading: boolean = true;
  infoData: string = ''
  async ngOnInit() {
    await this.getTableData();
    await this.getOverview();
  }

  private async getTableData() {
    this.loading = true;
    this.weatherService.getWeather({ lat: 33.44, lon: -94.04, appid: '', units: 'metric' })
      .pipe(
        tap(() => console.log("Llamando a la API...")),
        finalize(() => {
          this.loading = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.generalData = data;
          this.selectData('days')
        },
        error: (error) => console.error("Error al cargar datos", error)
      });
  }

  public selectData(selected: string) {
    this.selected = selected.toLowerCase();
    switch (this.selected) {
      case 'days':
        this.displayedData = this.generalData.daily.map(d => {
          const date = new Date(d.dt * 1000);
          const formattedDate = new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(date);
          return {
            day: formattedDate,
            temperature: d.temp.day,
            humidity: d.humidity,
            description: d.weather[0].description,
          }
        });
        break
      case 'hours':
        this.displayedData = this.generalData.hourly.map(d => {
          const date = new Date(d.dt * 1000);
          const formattedDate = new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(date);
          return {
            day: formattedDate,
            temperature: d.temp,
            humidity: d.humidity,
            description: d.weather[0].description,
          }
        });
        break;
    }
  }

  private async getOverview() {
    this.loading = true;
    this.weatherService.getOverview({ lat: 33.44, lon: -94.04, appid: '', units: 'metric' })
      .pipe(
        tap(() => console.log("Llamando a la API...")),
        finalize(() => {
          this.loading = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.infoData = data.weather_overview;

        },
        error: (error) => console.error("Error al cargar datos", error)
      });
  }
}
