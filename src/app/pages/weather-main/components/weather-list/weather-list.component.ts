import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {WeatherService} from '../../../../services/weather.service';
import {TableComponent} from '../../../../shared/components/organism/table/table.component';
import {CommonModule} from '@angular/common';
import {ResponseDataInterface, TableDataInterface} from '../../../../interfaces/weather.interface';
import {finalize, tap} from 'rxjs';
import {LoadingComponent} from '../../../../shared/components/atoms/loading/loading.component';
import {ChartComponent} from '../../../../shared/components/organism/chart/chart.component';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../../../shared/components/organism/error-dialog/error-dialog.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  templateUrl: './weather-list.component.html',
  imports: [
    TableComponent,
    CommonModule,
    LoadingComponent,
    ChartComponent,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule
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
  public lat = new FormControl('')
  public lon = new FormControl('')
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
    this.loading = true;
    this.renderer.setStyle(this.el.nativeElement, 'height', '100vh');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'flex-direction', 'column');
    await this.getTableData();
    await this.getOverview();
    this.loading = false;
  }

  public async getTableData(lat: number = 0, lon: number = 0) {
    this.weatherService.getWeather({lat: lat, lon: lon, appid: '', units: 'metric'})
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
          this.selectData('humidity/cloudy');
        },
        error: (error) => {
          console.error("Error al cargar datos", error);
          this.loading = false;
          this.showError('Error loading data');
        }
      });
  }

  public selectData(selected: string) {
    switch (selected.toLowerCase()) {
      case 'days':
        this.selected = selected.toLowerCase();
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
        this.selected = selected.toLowerCase();
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

  public getChartData(val: string) {
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
  }

  showError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {message: message},
      width: '400px'
    });
  }

  public async validateFields() {
    if (this.lat.value !== '' && this.lon.value !== '') {
      await this.getTableData(parseInt(this.lat.value!), parseInt(this.lon.value!));
    } else {
      this.showError('Latitude or Longitude field is empty')
    }
  }
}
