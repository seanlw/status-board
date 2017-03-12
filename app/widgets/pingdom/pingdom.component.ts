import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PingdomService, PingdomConfig, PingdomServer } from './pingdom.service';
import { TimeService } from '../../shared/time.service';


@Component({
  selector: 'pingdom',
  templateUrl: './widgets/pingdom/pingdom.component.html',
  styles: [ require('./pingdom.component.scss') ]
})
export class PingdomComponent implements OnInit {

  private config: PingdomConfig;
  private servers: PingdomServer[];
  private checks: any[];

  constructor(
    private widget: PingdomService,
    private time: TimeService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.widget.pingdomChanged.subscribe(checks => { this.checks = checks });
    this.widget.serversChanged.subscribe(servers => { this.servers = servers });
    this.widget.updatePingdom();
  }

  showConfig(config): void {
    this.config = this.widget.getConfig();
    this.modalService.open(config)
      .result.then((result) => {
        this.widget.setConfig(this.config);
        this.widget.updatePingdom();
      },
      (rejected) => {


      });
  }

  statusClass(server: any): string[] {
    return ['status', server.status];
  }

  responsetimeClass(server: any): string {
    let c = 'responsetime ';
    if (server.lastresponsetime >= 1500 && server.lastresponsetime < 3000) {
      c += 'warning';
    }
    if (server.lastresponsetime >= 3000) {
      c += 'critical';
    }

    return c;
  }

  updateServerConfig(index: number, server: any): void {
    this.config.servers[index] = server;
  }

  updateServers(): void {
    this.widget.getServers();
  }
}
