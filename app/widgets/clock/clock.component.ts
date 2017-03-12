import { Component, OnInit } from '@angular/core';

import { ClockService } from './clock.service';
import { TimeService } from '../../shared/time.service';

@Component({
  selector: 'clock',
  templateUrl: './widgets/clock/clock.component.html',
  styles: [ require('./clock.component.scss') ]
})
export class ClockComponent implements OnInit {

  hoursDeg: string;
  minutesDeg: string;
  secondsDeg: string;

  constructor(
    private widget: ClockService,
    private time: TimeService) {
  }

  ngOnInit(): void {
    this.time.timeChanged.subscribe(time => {
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let seconds = time.getSeconds();

      hours += (minutes / 60);
      minutes += (seconds / 60);

      this.hoursDeg = 'rotate(' + (hours * 30) + 'deg)';
      this.minutesDeg = 'rotate(' + (minutes * 6) + 'deg)';
      this.secondsDeg = 'rotate(' + (seconds * 6) + 'deg)';
    });
  }
}
