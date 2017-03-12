import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CountdownService, CountdownData } from './countdown.service';
import { TimeService } from '../../shared/time.service';

@Component({
  selector: 'countdown',
  templateUrl: './widgets/countdown/countdown.component.html',
  styles: [ require('./countdown.component.scss') ]
})
export class CountdownComponent implements OnInit {

  data: CountdownData;

  private config: any;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(
    private widget: CountdownService,
    private time: TimeService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.data = this.widget.getData();
    this.widget.dataChanged.subscribe(data => { this.data = data; });

    this.time.timeChanged.subscribe(now => {
        if (!this.data) { return; }
        let target = new Date(this.data.timestamp);
        let diff = target.getTime() - now.getTime() - this.widget.adjustForDST(now, target) + 1000;
        if (diff < 0) { return };

        let _second = 1000;
        let _minute = 1000 * 60;
        let _hour = 1000 * 60 * 60;
        let _day = 1000 * 60 * 60 * 24;

        this.days = Math.floor(diff / _day);
        this.hours = Math.floor((diff % _day) / _hour);
        this.minutes = Math.floor((diff % _hour) / _minute);
        this.seconds = Math.floor((diff % _minute) / _second);
      });
  }

  showConfig(config): void {
    this.modalService.open(config)
      .result.then((result) => {
        this.widget.setData(this.data);
      },
      (rejected) => {

      });
  }
}
