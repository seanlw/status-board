import { Injectable, Optional, Output, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from '../../shared/local-storage.service';
import { TimeService } from '../../shared/time.service';

export class BoardgamesServiceConfig {
  row: number;
  column: number;
}

@Injectable()
export class BoardgamesService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  private plays: any[] = [];
  private username: string;

  @Output() playsChanged: EventEmitter<any> = new EventEmitter();
  @Output() playCountChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    @Optional() config: BoardgamesServiceConfig,
    private storage: LocalStorageService,
    private time: TimeService,
    private http: Http) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
    this.time.interval1hChanged.subscribe(time => {
      this.updatePlays();
    });
    this.getUsername();
  }

  updatePlays(): void {
    if (!this.username || this.username === '') { return; }
    this.plays = [];
    this.getPlays(1)
      .then(() => {
        this.playCountChanged.emit(this.playDayCount(this.plays, 2));
        this.playsChanged.emit(this.plays);
      });

  }

  setUsername(username: string): void {
    this.username = username;
    this.storage.set('boardgames', username);
  }

  getUsername(): string {
    this.username = this.storage.get('boardgames');
    return this.username;
  }

  private getPlays(page: number): Promise<any> {
    return this.http.get(this.getUrl(page))
      .toPromise()
      .then((response) => {
        let xmlStr = response.text();
        let parser = new DOMParser();
        let doc = parser.parseFromString(xmlStr, 'application/xml');

        let plays = doc.getElementsByTagName('play');
        for (let play of plays) {
          let name = play.getElementsByTagName('item')[0].getAttribute('name');
          let date = play.getAttribute('date');
          let timestamp = new Date(date).getTime();
          let location = play.getAttribute('location');

          this.plays.push({
            name: name,
            date: date,
            timestamp: timestamp,
            location: location
          });
        }
        if (plays.length === 100) {
          return this.getPlays(page + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private getUrl(page: number): string {
    return 'https://www.boardgamegeek.com/xmlapi2/plays?username='
      + this.username + "&type=thing&subtype=boardgame&page=" + page;
  }

  private playDayCount(plays: any[], monthsAgo: number): any[] {
    let items = [];

    let now: Date = new Date();
    now.setHours(0, 0, 0, 0);

    let ago: Date = new Date();
    ago.setHours(0, 0, 0, 0);
    ago.setMonth(ago.getMonth() - monthsAgo);

    for (let play of plays) {
      if (play.timestamp >= ago.getTime()) {
        if (play.date in items ) {
          items[play.date] += 1;
        }
        else {
          items[play.date] = 1;
        }
      }
    }

    for (let d = ago; d <= now; d.setDate(d.getDate() + 1)) {
      let date = this.formatDate(d);
      if (!(date in items)) {
        items[date] = 0;
      }
    }

    return items;
  }

  private formatDate(time: Date): string {
    return time.getFullYear()
      + "-" + ("0" + (time.getMonth() + 1)).slice(-2)
      + "-" + ("0" + time.getDate()).slice(-2);
  }

}
