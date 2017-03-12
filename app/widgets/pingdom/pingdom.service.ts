import { Injectable, Optional, Output, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from '../../shared/local-storage.service';
import { TimeService } from '../../shared/time.service';

export class PingdomServiceConfig {
  row: number;
  column: number;
}

export class PingdomConfig {
  key: string = '';
  username: string = '';
  password: string = '';
  servers: string[] = [];

  constructor() {
    this.servers = Array(5);
  }
}

export class PingdomServer {
  name: string;
  hostname: string;

  constructor(name: string, hostname: string) {
    this.name = name;
    this.hostname = hostname;
  }
}

@Injectable()
export class PingdomService {

  row: number = 0;
  column: number = 0;

  top: number = 0;
  left: number = 0;

  private config;

  @Output() pingdomChanged: EventEmitter<any> = new EventEmitter();
  @Output() serversChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    @Optional() config: PingdomServiceConfig,
    private storage: LocalStorageService,
    private time: TimeService,
    private http: Http) {
    if (config) {
      this.row = config.row;
      this.column = config.column;

      this.top = (this.row - 1) * 260 + (this.row * 10) - 5;
      this.left = (this.column - 1) * 260 + (this.column * 10) - 5;
    }
    this.time.interval5mChanged.subscribe(time => {
      this.updatePingdom();
    });
    this.getConfig();
  }

  updatePingdom(): void {
    this.check().then((data) => {
      let servers: PingdomServer[] = [];
      let checks: any[] = [];
      for( let server of data.checks ) {
        servers.push(new PingdomServer(server.name, server.hostname));
        if (this.config.servers.indexOf(server.hostname) > -1) {
          checks.push(server);
        }
      }
      this.serversChanged.emit(servers);
      this.pingdomChanged.emit(checks);
    });
  }

  getConfig(): PingdomConfig {
    this.config = this.storage.get('pingdom') || new PingdomConfig();
    return this.config;
  }

  setConfig(config: PingdomConfig): void {
    this.storage.set('pingdom', config);
  }

  getServers(): Promise<any> {
    return this.check().then((data) => {
      let servers: PingdomServer[] = [];
      for( let server of data.checks ) {
        servers.push(new PingdomServer(server.name, server.hostname));
      }
      this.serversChanged.emit(servers);
      return servers;
    })
    .catch(() => {
      return [];
    })
  }

  private check(): Promise<any> {
    if (!this.config ||
      this.config.username === '' ||
      this.config.password === '' ||
      this.config.key === '') {
      return Promise.reject('missing key/username/password for pingdom request');
    }

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.config.username+':'+this.config.password));
    headers.append('App-Key', this.config.key);

    return this.http.get('https://api.pingdom.com/api/2.0/checks', {
      headers: headers
    })
      .toPromise()
      .then((response) => {
        let data = response.json();
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
