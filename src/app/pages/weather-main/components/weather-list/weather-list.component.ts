import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {WeatherService} from '../../../../services/weather.service';
import {TableComponent} from '../../../../shared/components/organism/table/table.component';
import {CommonModule} from '@angular/common';
import {ResponseDataInterface, TableDataInterface} from '../../../../interfaces/weather.interface';
import {finalize, tap} from 'rxjs';
import {LoadingComponent} from '../../../../shared/components/atoms/loading/loading.component';
import {CardComponent} from '../../../../shared/components/atoms/card/card.component';
import {ChartComponent} from '../../../../shared/components/organism/chart/chart.component';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../../../shared/components/organism/error-dialog/error-dialog.component';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  templateUrl: './weather-list.component.html',
  imports: [
    TableComponent,
    CommonModule,
    LoadingComponent,
    CardComponent,
    ChartComponent,
  ],
  styleUrl: './weather-list.component.scss'
})
export class WeatherListComponent implements OnInit {
  constructor(private weatherService: WeatherService,
              private cd: ChangeDetectorRef, private renderer: Renderer2,
              private el: ElementRef, private dialog: MatDialog) {
  }

  public options: { id: number, title: string }[] = [
    {id: 0, title: 'Days'},
    {id: 1, title: 'Hours'},
  ];
  public displayedData: TableDataInterface[]
  public generalData: ResponseDataInterface;
  public chartData: { name: string, value: string }[] = []
  public optionsChart: { id: number, title: string }[] = [
    {id: 0, title: 'Humidity/Cloudy'},
    {id: 1, title: 'Temp/FeelsLike'},
  ];

  public selected: string = 'days';
  public selectedChart: string = 'humidity/cloudy';
  loading: boolean = true;
  infoData: string = ''

  async ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'height', '100vh');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'flex-direction', 'column');

    this.loading = true;
    await this.getTableData();
    await this.getOverview();
    this.loading = false;
  }

  private async getTableData() {
    this.weatherService.getWeather({lat: 33.44, lon: -94.04, appid: '', units: 'metric'})
      .pipe(
        tap(() => console.log("Llamando a la API...")),
        finalize(() => {
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.generalData = data;
          this.selectData('days');
          this.getChartData('ch');
        },
        error: (error) => {
          console.error("Error al cargar datos", error)
          this.showError()
        }
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
        break;
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
      case 'humidity/cloudy':
        this.getChartData('ch')
        break;
      case 'temp/feelslike':
        this.getChartData('temp');
        break;
    }
  }

  private async getOverview() {
    this.weatherService.getOverview({lat: 33.44, lon: -94.04, appid: '', units: 'metric'})
      .pipe(
        tap(() => {
        }),
        finalize(() => {
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

  private getChartData(val: string) {
    this.chartData = [];
    if (val === 'ch') {
      this.selectedChart = 'Humidity/Cloudy';
      const humidity = this.generalData.daily.slice(0, 5).reduce((sum, day) => sum + day.humidity, 0);
      const cloudy = this.generalData.daily.slice(0, 5).reduce((sum, day) => sum + day.clouds, 0);
      this.chartData.push({name: 'Humidity', value: humidity.toString()});
      this.chartData.push({name: 'Cloudy', value: cloudy.toString()});
    } else {
      this.selectedChart = 'Temp/FeelsLike';
      const temp = this.generalData.daily.slice(0, 5).reduce((sum, day) => sum + day.temp.day, 0);
      const feelsLike = this.generalData.daily.slice(0, 5).reduce((sum, day) => sum + day.feels_like.day, 0);
      this.chartData.push({name: 'Temperature', value: temp.toString()});
      this.chartData.push({name: 'Feels like', value: feelsLike.toString()});
    }
    console.log('chartData: ', this.chartData);
  }

  showError() {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: 'Ocurrió un error inesperado.' },
      width: '400px'
    });
  }
}
