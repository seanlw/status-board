import { Injectable, Optional } from '@angular/core';

export class ClockServiceConfig {
  row: number;
  column: number;
}

@Injectable()
export class ClockService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  constructor(@Optional() config: ClockServiceConfig) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
  }

  getTime(): any {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    hours += (minutes / 60);
    minutes += (seconds / 60);

    return {'hours': hours, 'minutes': minutes, 'seconds': seconds};
  }

}
