import { Injectable, Optional, Output, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from '../../shared/local-storage.service';
import { TimeService } from '../../shared/time.service';

export class RssServiceConfig {
  row: number;
  column: number;
}

@Injectable()
export class RssService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  private rssItems: any[] = [];
  private feeds: any[] = [];

  @Output() rssChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    @Optional() config: RssServiceConfig,
    private storage: LocalStorageService,
    private time: TimeService,
    private http: Http) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
    this.time.interval10mChanged.subscribe(time => {
      this.updateRss();
    });
    this.getFeeds();
    if (!this.feeds) {
      this.feeds = [{ url: ''}];
    }
  }

  updateRss(): void {
    this.rssItems = [];
    let p: any = []
    for (let feed of this.feeds) {
      p.push(this.getFeed(feed.url));
    }
    Promise.all(p)
      .then(() => {
        this.rssItems.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
        this.rssChanged.emit(this.rssItems);
      });
  }

  setFeeds(feeds: string[]): void {
    this.feeds = feeds;
    this.storage.set('rss', feeds);
  }

  getFeeds(): string[] {
    this.feeds = this.storage.get('rss');
    return this.feeds;
  }

  private getFeed(url: string): Promise<any> {
    if (url === '') {
      return Promise.reject('url not given');
    }

    return this.http.get(url)
      .toPromise()
      .then((response) => {
        let xmlStr = response.text();
        let parser = new DOMParser();
        let doc = parser.parseFromString(xmlStr, 'application/xml');

        let title = doc.getElementsByTagName('title')[0].childNodes[0].nodeValue;
        let items = doc.getElementsByTagName('item');
        for (let item of items) {
          let itemTitle = item.getElementsByTagName('title')[0].childNodes[0].nodeValue;
          let pubDate = '';
          try {
            pubDate = item.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
          }
          catch(e) {
            for (let node of item.childNodes) {
              if(node.nodeName === 'dc:date') {
                pubDate = node.childNodes[0].nodeValue;
                break;
              }
            }
          }
          let date = new Date(pubDate);
          this.rssItems.push({
            feedTitle: title,
            timestamp: date.getTime(),
            title: itemTitle,
            formatDate: this.formatDate(date)
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private formatDate(time: Date): string {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutesStr + ' ' + ampm;
  }

}
