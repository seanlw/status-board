import { Injectable, Optional } from '@angular/core';

export class TwitServiceConfig {
  row: number;
  column: number;
}

@Injectable()
export class TwitService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  constructor(@Optional() config: TwitServiceConfig) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
  }

}
