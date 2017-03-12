import { Component, OnInit } from '@angular/core';

import { DateService } from './date.service';
import { TimeService } from '../../shared/time.service';

@Component({
  selector: 'date',
  templateUrl: './widgets/date/date.component.html',
  styles: [ require('./date.component.scss') ]
})
export class DateComponent implements OnInit {

  weekday: string;
  month: string;
  day: string;

  constructor(
    private widget: DateService,
    private time: TimeService) {
  }

  ngOnInit(): void {
    this.time.timeChanged.subscribe(time => {
      this.weekday = this.widget.getDay(time.getDay());
      this.month = this.widget.getMonth(time.getMonth());
      this.day = time.getDate();
    });
  }
}
