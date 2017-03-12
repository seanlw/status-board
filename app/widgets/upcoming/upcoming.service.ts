import { Injectable, Optional, Output, EventEmitter } from '@angular/core';
import * as GoogleSpreadsheet from 'google-spreadsheet';

import { LocalStorageService } from '../../shared/local-storage.service';
import { TimeService } from '../../shared/time.service';

export class UpcomingServiceConfig {
  row: number;
  column: number;
}

@Injectable()
export class UpcomingService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  private url: string;
  private gsId: string;

  @Output() upcomingChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    @Optional() config:UpcomingServiceConfig,
    private storage: LocalStorageService,
    private time: TimeService) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
    this.time.interval10mChanged.subscribe(time => {
      this.updateUpcoming();
    });
    this.url = this.storage.get('upcoming');
    this.gsId = this.getGsIdFromUrl(this.url);
  }

  updateUpcoming(): void {
    if (!this.gsId) { return; }

    let doc = new GoogleSpreadsheet(this.gsId);
    doc.getInfo((err, info) => {
      if (err) { throw err; }
      let worksheet = info.worksheets[0];
      worksheet.getRows({
        orderby: 'date'
      },
      (err, rows) => {
          if (err) { throw err; }
          let upcomingData: any = [];
          for (let row of rows) {
            let date = new Date(row.date);
            let days = Math.floor((date.getTime() - Date.now()) / (60 * 60 * 24 * 1000)) + 1;

            if (days >= 0) {
              upcomingData.push({
                days: days,
                title: row.title
              });
            }
          }
          this.upcomingChanged.emit(upcomingData);
      });
    });
  }

  setUrl(url: string): void {
    this.url = url;
    this.gsId = this.getGsIdFromUrl(this.url);
    this.storage.set('upcoming', this.url);
  }

  getUrl(): string {
    return this.url;
  }

  private getGsIdFromUrl(url: string): string {
    if (!url) { return null; }
    let found = url.match(/https:\/\/.*\/d\/([^\/]*)\//);
    return (found === null) ? null : found[1];
  }

}
