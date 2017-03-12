import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { WeatherService } from './weather.service';
import { TimeService } from '../../shared/time.service';

import { WeatherUndergroundConfig } from './weather-underground-config';
import { WeatherData } from './weather-data';

@Component({
  selector: 'weather',
  templateUrl: './widgets/weather/weather.component.html',
  styles: [ require('./weather.component.scss') ]
})
export class WeatherComponent implements OnInit {

  private config: WeatherUndergroundConfig;
  private weather: WeatherData = new WeatherData();

  constructor(
    private widget: WeatherService,
    private time: TimeService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.widget.weatherChanged.subscribe(weather => {
      weather.current.temp_f = Math.round(weather.current.temp_f);
      this.weather = weather;
    });
    this.widget.updateWeather();
  }

  showConfig(config): void {
    this.config = this.widget.getConfig();
    this.modalService.open(config)
      .result.then((result) => {
        this.widget.setConfig(this.config);
        this.widget.updateWeather();
      },
      (rejected) => {

      });
  }

  weatherClass(day: any): string[] {
    let wClass = ['weather-day'];

    switch(day.icon) {
      case 'chancerain':
      case 'chancetstorms':
      case 'rain':
      case 'tstorms':
      case 'unknown':
        return wClass.concat('weather-rain');
      case 'chanceflurries':
      case 'chancesleet':
      case 'chancesnow':
      case 'flurries':
      case 'sleet':
      case 'snow':
        return wClass.concat('weather-snow');
      case 'cloudy':
      case 'fog':
      case 'hazy':
        return wClass.concat('weather-cloud');
      case 'mostlycloudy':
      case 'mostlysunny':
      case 'partlysunny':
      case 'partlycloudy':
        return wClass.concat('weather-cloud-sun');
      default:
        return wClass.concat('weather-sun');
    }
  }
}
