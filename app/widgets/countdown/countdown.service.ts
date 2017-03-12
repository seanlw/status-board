import { Injectable, Optional, Output, EventEmitter } from '@angular/core';

import { LocalStorageService } from '../../shared/local-storage.service';

export class CountdownServiceConfig {
  row: number;
  column: number;
}

export class CountdownData {
  title: string;
  date: string;
  time: string;
  timestamp: number;
}

@Injectable()
export class CountdownService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  data: CountdownData;
  @Output() dataChanged: EventEmitter<CountdownData> = new EventEmitter();

  constructor(
    @Optional() config: CountdownServiceConfig,
    private storage: LocalStorageService) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
    this.data = this.getData();
  }

  setDateTime(date: string, time: string): void {
    this.data.date = date;
    this.data.time = time;

    let d = new Date(date + ' ' + time);
    this.data.timestamp = d.getTime();

    this.storage.set('countdown', this.data);
    this.dataChanged.emit(this.data);
  }

  setTitle(title: string): void {
    this.data.title = title;
    this.storage.set('countdown', this.data);
    this.dataChanged.emit(this.data);
  }

  setData(data: CountdownData) {
    let d = new Date(data.date + ' ' + data.time);
    data.timestamp = d.getTime();
    this.data = data;
    this.storage.set('countdown', this.data);
    this.dataChanged.emit(this.data);
  }

  getData(): CountdownData {
    this.data = this.storage.get('countdown');
    if (!this.data) {
      this.data = new CountdownData();
    }
    return this.data;
  }

  adjustForDST(a: Date, b: Date): number {
    var diff = (a.getTimezoneOffset() - b.getTimezoneOffset() !== 0);
    return diff ? (60*60*1000) : 0;
  }

}
