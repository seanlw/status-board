import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RssService } from './rss.service';
import { TimeService } from '../../shared/time.service';


@Component({
  selector: 'rss',
  templateUrl: './widgets/rss/rss.component.html',
  styles: [ require('./rss.component.scss') ]
})
export class RssComponent implements OnInit {

  private feeds: any[];
  private rss: any[];

  constructor(
    private widget: RssService,
    private time: TimeService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.widget.rssChanged.subscribe(rss => { this.rss = rss });
    this.widget.updateRss();
  }

  showConfig(config): void {
    this.feeds = this.widget.getFeeds();
    this.modalService.open(config)
      .result.then((result) => {
        this.widget.setFeeds(this.feeds);
        this.widget.updateRss();
      },
      (rejected) => {
        this.feeds = this.widget.getFeeds();
      });
  }

  addFeedUrl(index: number): void {
    this.feeds.splice(index + 1, 0, {'url': ''});
  }

  removeFeedUrl(index: number): void {
    this.feeds.splice(index, 1);
  }
}
