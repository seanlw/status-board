import { Injectable, Optional, Output, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from '../../shared/local-storage.service';
import { TimeService } from '../../shared/time.service';

import { WeatherUndergroundConfig } from './weather-underground-config';

export class WeatherServiceConfig {
  row: number;
  column: number;
}

@Injectable()
export class WeatherService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  private weather: any = {};
  private config: WeatherUndergroundConfig;

  @Output() weatherChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    @Optional() config: WeatherServiceConfig,
    private storage: LocalStorageService,
    private time: TimeService,
    private http: Http) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
    this.time.interval10mChanged.subscribe(time => {
      this.updateWeather();
    });
    this.config = this.storage.get('weather');
  }

  updateWeather(): void {
    if (!this.config) { return; }

    this.http.get(this.getWeatherUrl())
      .toPromise()
      .then((response) => {
        let data = response.json();
        this.weather.current = data.current_observation;
      })
      .then(() => {
        return this.http.get(this.getExtendedForcastUrl())
          .toPromise()
          .then((response) => {
            let data = response.json();
            this.weather.days = data.forecast.simpleforecast.forecastday;
            this.weatherChanged.emit(this.weather);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setConfig(config: WeatherUndergroundConfig): void {
    this.config = config;
    this.storage.set('weather', config);
  }

  getConfig(): WeatherUndergroundConfig {
    if (!this.config) {
      this.config = new WeatherUndergroundConfig();
    }
    return this.config;
  }

  private getWeatherUrl(): string {
    return 'http://api.wunderground.com/api/'
      + this.config.apiKey + '/conditions/q/' + this.config.zip + '.json';
  }

  private getExtendedForcastUrl(): string {
    return 'http://api.wunderground.com/api/'
      + this.config.apiKey + '/forecast10day/q/'
      + this.config.state + '/' + this.config.city + '.json';
  }

}
