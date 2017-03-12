import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { generate } from 'c3';

import { BoardgamesService } from './boardgames.service';
import { TimeService } from '../../shared/time.service';


@Component({
  selector: 'boardgames',
  templateUrl: './widgets/boardgames/boardgames.component.html',
  styles: [ require('./boardgames.component.scss') ],
  encapsulation: ViewEncapsulation.None
})
export class BoardgamesComponent implements OnInit {

  private username: string;
  private plays: any[];
  private graph: any;

  constructor(
    private widget: BoardgamesService,
    private time: TimeService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.widget.playCountChanged.subscribe(plays => {
      this.plays = plays;
      this.generateGraph();
    });
    this.widget.updatePlays();
  }

  showConfig(config): void {
    this.username = this.widget.getUsername();
    this.modalService.open(config)
      .result.then((result) => {
        this.widget.setUsername(this.username);
        this.widget.updatePlays();
      },
      (rejected) => {
        this.username = this.widget.getUsername();
      });
  }

  private generateGraph(): void {
    let x = ['x'];
    let y = ['plays'];
    let keys = Object.keys(this.plays).sort();

    for (let key of keys) {
      x.push(key);
      y.push(this.plays[key]);
    }
    let data = [x, y];
    if (this.graph === undefined) {
      this.makeGraph(data);
    }
    else {
      this.graph.load({
        columns: data
      });
    }
  }

  private makeGraph(data: any): void {
    /*
       Create the y axis values since c3 likes to use decimals
       when creating tick marks
    */
    let miny = Math.min(...data[1].slice(1));
    let maxy = Math.max(...data[1].slice(1));
    let yvalues = [];
    for ( var i = miny; i <= maxy; i++ ){
      yvalues.push(i);
    }

    this.graph = generate({
      bindto: '#boardgames-chart',
      padding: {
        left: 20,
        right: 15,
        top: 10
      },
      data: {
        x: 'x',
        columns: data,
        type: 'area'
      },
      grid: {
        y: {
          show: true
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false
      },
      point: {
        show: false
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%b %e'
          },
          padding: {
            left: 0,
            right: 0
          }
        },
        y: {
          tick: {
            count: 4,
            values: yvalues
          },
          min: 0,
          padding: {
            bottom: 0,
            top: 0
          }
        }
      },
      size: {
        width: 768,
        height: 188
      }
    });
  }
}
