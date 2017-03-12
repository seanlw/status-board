import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DateComponent } from './date.component';
import { DateService, DateServiceConfig } from './date.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    DateComponent
  ],
  providers: [
    DateService
  ],
  exports: [ DateComponent ]
})
export class DateModule {
  static forRoot(config: DateServiceConfig): ModuleWithProviders {
    return {
      ngModule: DateModule,
      providers: [
        { provide: DateServiceConfig, useValue: config }
      ]
    }
  }
}
