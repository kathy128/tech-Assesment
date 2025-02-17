import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherListComponent } from './weather-list.component';
import {WeatherService} from '../../../../services/weather.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

describe('WeatherListComponent', () => {
  let component: WeatherListComponent;
  let fixture: ComponentFixture<WeatherListComponent>;
  let cdMock: jasmine.SpyObj<ChangeDetectorRef>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;
  let dialog: MatDialog;
  let openSpy: jasmine.Spy;
  let getTableDataSpy: jasmine.Spy;

  beforeEach(async () => {
    weatherServiceMock = jasmine.createSpyObj('WeatherService', ['getWeather', 'getOverview']);
    cdMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,WeatherListComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceMock },
        { provide: ChangeDetectorRef, useValue: cdMock },]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherListComponent);
    dialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    openSpy = spyOn(dialog, 'open').and.callThrough();
    getTableDataSpy = spyOn(component, 'getTableData').and.returnValue(Promise.resolve());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should select "days" and format displayedData', () => {
    component.generalData = {
      lat: 33.44,
      lon: -94.04,
      current: {
        dt: 1739762446,
        sunrise: 1739710741,
        sunset: 1739750501,
        temp: 2.04,
        feels_like: -0.67,
        pressure: 1028,
        humidity: 58,
        dew_point: -4.74,
        uvi: 0,
        clouds: 0,
        visibility: 10000,
        wind_speed: 2.57,
        wind_deg: 360,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ]
      },
      minutely: [
        {
          dt: 1739762460,
          precipitation: 0
        }
      ],
      hourly: [
        {
          dt: 1739761200,
          temp: 2.04,
          feels_like: -1.3,
          pressure: 1028,
          humidity: 58,
          dew_point: -4.74,
          uvi: 0,
          clouds: 0,
          visibility: 10000,
          wind_speed: 3.32,
          wind_deg: 2,
          wind_gust: 8.33,
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01n"
            }
          ],
          pop: 0
        }
      ],
      daily: [
        {
          dt: 1739728800,
          sunrise: 1739710741,
          sunset: 1739750501,
          moonrise: 1739765040,
          moonset: 1739717880,
          moon_phase: 0.63,
          summary: "You can expect partly cloudy in the morning, with clearing in the afternoon",
          temp: {
            day: 4.93,
            min: -0.85,
            max: 7.9,
            night: 0.92,
            eve: 3,
            morn: 0.46
          },
          feels_like: {
            day: 1.33,
            night: -1.95,
            eve: -0.36,
            morn: -5.01
          },
          pressure: 1026,
          humidity: 51,
          dew_point: -4.19,
          wind_speed: 7.88,
          wind_deg: 327,
          wind_gust: 14.07,
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ],
          clouds: 21,
          pop: 0,
          uvi: 4.57
        }
      ]
    };
    component.selectData('days');
    expect(component.selected).toBe('days');
    expect(component.displayedData.length).toBe(1);
  });

  it('Should select "hours" and format displayedData', () => {
    component.generalData = {
      lat: 33.44,
      lon: -94.04,
      current: {
        dt: 1739762446,
        sunrise: 1739710741,
        sunset: 1739750501,
        temp: 2.04,
        feels_like: -0.67,
        pressure: 1028,
        humidity: 58,
        dew_point: -4.74,
        uvi: 0,
        clouds: 0,
        visibility: 10000,
        wind_speed: 2.57,
        wind_deg: 360,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ]
      },
      minutely: [
        {
          dt: 1739762460,
          precipitation: 0
        }
      ],
      hourly: [
        {
          dt: 1739761200,
          temp: 2.04,
          feels_like: -1.3,
          pressure: 1028,
          humidity: 58,
          dew_point: -4.74,
          uvi: 0,
          clouds: 0,
          visibility: 10000,
          wind_speed: 3.32,
          wind_deg: 2,
          wind_gust: 8.33,
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01n"
            }
          ],
          pop: 0
        }
      ],
      daily: [
        {
          dt: 1739728800,
          sunrise: 1739710741,
          sunset: 1739750501,
          moonrise: 1739765040,
          moonset: 1739717880,
          moon_phase: 0.63,
          summary: "You can expect partly cloudy in the morning, with clearing in the afternoon",
          temp: {
            day: 4.93,
            min: -0.85,
            max: 7.9,
            night: 0.92,
            eve: 3,
            morn: 0.46
          },
          feels_like: {
            day: 1.33,
            night: -1.95,
            eve: -0.36,
            morn: -5.01
          },
          pressure: 1026,
          humidity: 51,
          dew_point: -4.19,
          wind_speed: 7.88,
          wind_deg: 327,
          wind_gust: 14.07,
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ],
          clouds: 21,
          pop: 0,
          uvi: 4.57
        }
      ]
    };
    component.selectData('hours');

    expect(component.selected).toBe('hours');
    expect(component.displayedData.length).toBe(1);
    expect(component.displayedData[0]).toEqual({
      day: '16/02/2025',
      temperature: 2.04,
      humidity: 58,
      description: "clear sky",
    });
  });

  it('Should call getChartData with "ch" when "humidity/cloudy is selected"', () => {
    spyOn(component, 'getChartData');
    component.selectData('humidity/cloudy');
    expect(component.getChartData).toHaveBeenCalledWith('ch');
  });

  it('Should call getChartData with "temp" when "temp/feelslike" is selected ', () => {
    spyOn(component, 'getChartData');
    component.selectData('temp/feelslike');
    expect(component.getChartData).toHaveBeenCalledWith('temp');
  });

  it('Should update infoData with getOverview response', async () => {
    const mockData = { weather_overview: 'Currently, the weather is clear with a temperature o' };
    weatherServiceMock.getOverview.and.returnValue(of(mockData));
    await component['getOverview']();
    expect(weatherServiceMock.getOverview).toHaveBeenCalledWith({
      lat: 33.44,
      lon: -94.04,
      appid: '',
      units: 'metric',
    });

    expect(component.infoData).toEqual(mockData.weather_overview);
  });

  it('Should handle error and no update infoData', async () => {
    spyOn(console, 'error');
    weatherServiceMock.getOverview.and.returnValue(throwError(() => new Error('API error')));

    await component['getOverview']();

    expect(weatherServiceMock.getOverview).toHaveBeenCalled();
    expect(component.infoData).toBe('');
    expect(console.error).toHaveBeenCalledWith("Error al cargar datos", jasmine.any(Error));
  });

  it('should set the selected chart to "Humidity/Cloudy" when value is "ch"', () => {
    component.generalData = {
      lat: 33.44,
      lon: -94.04,
      current: {
        dt: 1739762446,
        sunrise: 1739710741,
        sunset: 1739750501,
        temp: 2.04,
        feels_like: -0.67,
        pressure: 1028,
        humidity: 58,
        dew_point: -4.74,
        uvi: 0,
        clouds: 0,
        visibility: 10000,
        wind_speed: 2.57,
        wind_deg: 360,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ]
      },
      minutely: [
        {
          dt: 1739762460,
          precipitation: 0
        }
      ],
      hourly: [
        {
          dt: 1739761200,
          temp: 2.04,
          feels_like: -1.3,
          pressure: 1028,
          humidity: 58,
          dew_point: -4.74,
          uvi: 0,
          clouds: 0,
          visibility: 10000,
          wind_speed: 3.32,
          wind_deg: 2,
          wind_gust: 8.33,
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01n"
            }
          ],
          pop: 0
        }
      ],
      daily: [
        {
          dt: 1739728800,
          sunrise: 1739710741,
          sunset: 1739750501,
          moonrise: 1739765040,
          moonset: 1739717880,
          moon_phase: 0.63,
          summary: "You can expect partly cloudy in the morning, with clearing in the afternoon",
          temp: {
            day: 4.93,
            min: -0.85,
            max: 7.9,
            night: 0.92,
            eve: 3,
            morn: 0.46
          },
          feels_like: {
            day: 1.33,
            night: -1.95,
            eve: -0.36,
            morn: -5.01
          },
          pressure: 1026,
          humidity: 51,
          dew_point: -4.19,
          wind_speed: 7.88,
          wind_deg: 327,
          wind_gust: 14.07,
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ],
          clouds: 21,
          pop: 0,
          uvi: 4.57
        }
      ]
    };
    component.getChartData('ch');
    expect(component.selectedChart).toBe('Humidity/Cloudy');
  });

  it('should calculate and add humidity data correctly when value is "ch"', () => {
    component.generalData = {
      lat: 33.44,
      lon: -94.04,
      current: {
        dt: 1739762446,
        sunrise: 1739710741,
        sunset: 1739750501,
        temp: 2.04,
        feels_like: -0.67,
        pressure: 1028,
        humidity: 58,
        dew_point: -4.74,
        uvi: 0,
        clouds: 0,
        visibility: 10000,
        wind_speed: 2.57,
        wind_deg: 360,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ]
      },
      minutely: [
        {
          dt: 1739762460,
          precipitation: 0
        }
      ],
      hourly: [
        {
          dt: 1739761200,
          temp: 2.04,
          feels_like: -1.3,
          pressure: 1028,
          humidity: 58,
          dew_point: -4.74,
          uvi: 0,
          clouds: 0,
          visibility: 10000,
          wind_speed: 3.32,
          wind_deg: 2,
          wind_gust: 8.33,
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01n"
            }
          ],
          pop: 0
        }
      ],
      daily: [
        {
          dt: 1739728800,
          sunrise: 1739710741,
          sunset: 1739750501,
          moonrise: 1739765040,
          moonset: 1739717880,
          moon_phase: 0.63,
          summary: "You can expect partly cloudy in the morning, with clearing in the afternoon",
          temp: {
            day: 4.93,
            min: -0.85,
            max: 7.9,
            night: 0.92,
            eve: 3,
            morn: 0.46
          },
          feels_like: {
            day: 1.33,
            night: -1.95,
            eve: -0.36,
            morn: -5.01
          },
          pressure: 1026,
          humidity: 51,
          dew_point: -4.19,
          wind_speed: 7.88,
          wind_deg: 327,
          wind_gust: 14.07,
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ],
          clouds: 21,
          pop: 0,
          uvi: 4.57
        }
      ]
    };
    component.getChartData('ch');
    expect(component.chartData).toEqual([
      { name: 'Humidity', value: '51' },
      { name: 'Cloudy', value: '21' },
    ]);
  });

  it('should set the selected chart to "Temp/FeelsLike" when value is not "ch"', () => {
    component.generalData = {
      lat: 33.44,
      lon: -94.04,
      current: {
        dt: 1739762446,
        sunrise: 1739710741,
        sunset: 1739750501,
        temp: 2.04,
        feels_like: -0.67,
        pressure: 1028,
        humidity: 58,
        dew_point: -4.74,
        uvi: 0,
        clouds: 0,
        visibility: 10000,
        wind_speed: 2.57,
        wind_deg: 360,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ]
      },
      minutely: [
        {
          dt: 1739762460,
          precipitation: 0
        }
      ],
      hourly: [
        {
          dt: 1739761200,
          temp: 2.04,
          feels_like: -1.3,
          pressure: 1028,
          humidity: 58,
          dew_point: -4.74,
          uvi: 0,
          clouds: 0,
          visibility: 10000,
          wind_speed: 3.32,
          wind_deg: 2,
          wind_gust: 8.33,
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01n"
            }
          ],
          pop: 0
        }
      ],
      daily: [
        {
          dt: 1739728800,
          sunrise: 1739710741,
          sunset: 1739750501,
          moonrise: 1739765040,
          moonset: 1739717880,
          moon_phase: 0.63,
          summary: "You can expect partly cloudy in the morning, with clearing in the afternoon",
          temp: {
            day: 4.93,
            min: -0.85,
            max: 7.9,
            night: 0.92,
            eve: 3,
            morn: 0.46
          },
          feels_like: {
            day: 1.33,
            night: -1.95,
            eve: -0.36,
            morn: -5.01
          },
          pressure: 1026,
          humidity: 51,
          dew_point: -4.19,
          wind_speed: 7.88,
          wind_deg: 327,
          wind_gust: 14.07,
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ],
          clouds: 21,
          pop: 0,
          uvi: 4.57
        }
      ]
    };

    component.getChartData('other');
    expect(component.selectedChart).toBe('Temp/FeelsLike');
  });

  it('should calculate and add temperature data correctly when value is not "ch"', () => {
    component.generalData = {
      lat: 33.44,
      lon: -94.04,
      current: {
        dt: 1739762446,
        sunrise: 1739710741,
        sunset: 1739750501,
        temp: 2.04,
        feels_like: -0.67,
        pressure: 1028,
        humidity: 58,
        dew_point: -4.74,
        uvi: 0,
        clouds: 0,
        visibility: 10000,
        wind_speed: 2.57,
        wind_deg: 360,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n"
          }
        ]
      },
      minutely: [
        {
          dt: 1739762460,
          precipitation: 0
        }
      ],
      hourly: [
        {
          dt: 1739761200,
          temp: 2.04,
          feels_like: -1.3,
          pressure: 1028,
          humidity: 58,
          dew_point: -4.74,
          uvi: 0,
          clouds: 0,
          visibility: 10000,
          wind_speed: 3.32,
          wind_deg: 2,
          wind_gust: 8.33,
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01n"
            }
          ],
          pop: 0
        }
      ],
      daily: [
        {
          dt: 1739728800,
          sunrise: 1739710741,
          sunset: 1739750501,
          moonrise: 1739765040,
          moonset: 1739717880,
          moon_phase: 0.63,
          summary: "You can expect partly cloudy in the morning, with clearing in the afternoon",
          temp: {
            day: 4.93,
            min: -0.85,
            max: 7.9,
            night: 0.92,
            eve: 3,
            morn: 0.46
          },
          feels_like: {
            day: 1.33,
            night: -1.95,
            eve: -0.36,
            morn: -5.01
          },
          pressure: 1026,
          humidity: 51,
          dew_point: -4.19,
          wind_speed: 7.88,
          wind_deg: 327,
          wind_gust: 14.07,
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02d"
            }
          ],
          clouds: 21,
          pop: 0,
          uvi: 4.57
        }
      ]
    };
    component.getChartData('other');
    expect(component.chartData).toEqual([
      { name: 'Temperature', value: '4.93' },
      { name: 'Feels like', value: '1.33' },
    ]);
  });

  it('should open the error dialog with the correct message', () => {
    const errorMessage = 'This is an error message';
    spyOn(component, 'showError');
    component.showError(errorMessage);
    expect(component.showError).toHaveBeenCalledWith('This is an error message');
  });

  it('should call getTableData when both lat and lon are provided', async () => {
    component.lat.setValue('10');
    component.lon.setValue('20');
    await component.validateFields();
    expect(getTableDataSpy).toHaveBeenCalled();
  });

  it('should call showError when lat or lon is empty', async () => {
    spyOn(component, 'showError');
    component.lat.setValue('');
    component.lon.setValue('20');
    await component.validateFields();
    expect(component.showError).toHaveBeenCalledWith('Latitude or Longitude field is empty');
  });

});
