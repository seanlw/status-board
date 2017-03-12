import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ClockComponent } from './clock.component';
import { ClockService, ClockServiceConfig } from './clock.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    ClockComponent
  ],
  providers: [
    ClockService
  ],
  exports: [ ClockComponent ]
})
export class ClockModule {
  static forRoot(config: ClockServiceConfig): ModuleWithProviders {
    return {
      ngModule: ClockModule,
      providers: [
        { provide: ClockServiceConfig, useValue: config }
      ]
    }
  }
}
