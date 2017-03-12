import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TimeService {

  @Output() timeChanged: EventEmitter<Date> = new EventEmitter();
  @Output() interval5mChanged: EventEmitter<Date> = new EventEmitter();
  @Output() interval10mChanged: EventEmitter<Date> = new EventEmitter();
  @Output() interval1hChanged: EventEmitter<Date> = new EventEmitter();

  constructor() {
    let time = Observable.interval(1000).subscribe(x => {
      this.timeChanged.emit(new Date());
    });
    let i5 = Observable.interval(300000).subscribe(x => {
        this.interval5mChanged.emit(new Date());
    });
    let i10 = Observable.interval(600000).subscribe(x => {
      this.interval10mChanged.emit(new Date());
    });
    let i60 = Observable.interval(3600 * 1000).subscribe(x => {
      this.interval1hChanged.emit(new Date());
    });
  }
}
