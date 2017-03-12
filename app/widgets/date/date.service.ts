import { Injectable, Optional } from '@angular/core';

export class DateServiceConfig {
  row: number;
  column: number;
}

@Injectable()
export class DateService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  constructor(@Optional() config: DateServiceConfig) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
  }

  getDay(day: number): string {
    let dayString = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    return dayString[day];
  }

  getMonth(month: number): string {
    let monthString = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    return monthString[month];
  }

}
