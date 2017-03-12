import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UpcomingService } from './upcoming.service';
import { TimeService } from '../../shared/time.service';

@Component({
  selector: 'upcoming',
  templateUrl: './widgets/upcoming/upcoming.component.html',
  styles: [ require('./upcoming.component.scss') ]
})
export class UpcomingComponent implements OnInit {

  private url: string;
  private data: any[];

  constructor(
    private widget: UpcomingService,
    private time: TimeService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.url = this.widget.getUrl();
    this.widget.upcomingChanged.subscribe((data) => { this.data = data });
    this.widget.updateUpcoming();
  }

  showConfig(config): void {
    this.modalService.open(config)
      .result.then((result) => {
        this.widget.setUrl(this.url);
        this.widget.updateUpcoming();
      },
      (rejected) => {

      });
  }

}
