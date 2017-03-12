export class WeatherData {
  current: any;
  days: any;

  constructor() {
    this.current = {};
    this.current.display_location = {};
    this.current.display_location.city = '';
    this.current.display_location.state = '';

    this.days = [];
  }
}
