import { Component, OnInit } from '@angular/core';

import { TwitService } from './twit.service';
import { TimeService } from '../../shared/time.service';

@Component({
  selector: 'twit',
  templateUrl: './widgets/twit/twit.component.html',
  styles: [ require('./twit.component.scss') ]
})
export class TwitComponent implements OnInit {

  constructor(
    private widget: TwitService,
    private time: TimeService) {
  }

  ngOnInit(): void {

  }
}
