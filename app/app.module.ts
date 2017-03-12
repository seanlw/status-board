import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LocalStorageService } from './shared/local-storage.service';
import { TimeService } from './shared/time.service';

import { ClockModule } from './widgets/clock/clock.module';
import { DateModule } from './widgets/date/date.module';
import { CountdownModule } from './widgets/countdown/countdown.module';
import { WeatherModule } from './widgets/weather/weather.module';
import { UpcomingModule } from './widgets/upcoming/upcoming.module';
import { RssModule } from './widgets/rss/rss.module';
import { BoardgamesModule } from './widgets/boardgames/boardgames.module';
import { PingdomModule } from './widgets/pingdom/pingdom.module';
import { TwitModule } from './widgets/twit/twit.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ClockModule.forRoot({row: 1, column: 1}),
    WeatherModule.forRoot({row: 1, column: 2}),
    DateModule.forRoot({row: 1, column: 3}),
    CountdownModule.forRoot({row: 2, column: 3}),
    RssModule.forRoot({row: 2, column: 1}),
    PingdomModule.forRoot({row: 3, column: 1}),
    UpcomingModule.forRoot({row: 3, column: 3}),
    BoardgamesModule.forRoot({row: 4, column: 1}),
    TwitModule.forRoot({row: 3, column: 4})
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    LocalStorageService,
    TimeService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
