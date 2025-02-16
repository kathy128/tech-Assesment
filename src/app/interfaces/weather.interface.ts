export interface WeatherParamsInterface {
  lat: number,
  lon: number,
  appid: string,
  exclude?: string,
  date?: string,
  units?: string,
  lang?: string,
}

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableDataInterface {
  day: string,
  temperature: string,
  humidity: string,
  description: string,
}

export interface ResponseDataInterface{
  current: any,
  daily: any[],
  hourly: any[],
  lat: number,
  lon: number,
  minutely: any[]
}

export interface ResponseOverviewInterface{
  lat: number,
  lon: number,
  tz: string,
  date: string,
  units: string,
  weather_overview:string,
}
