import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { TwitComponent } from './twit.component';
import { TwitService, TwitServiceConfig } from './twit.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [
    TwitComponent
  ],
  providers: [
    TwitService
  ],
  exports: [ TwitComponent ]
})
export class TwitModule {
  static forRoot(config: TwitServiceConfig): ModuleWithProviders {
    return {
      ngModule: TwitModule,
      providers: [
        { provide: TwitServiceConfig, useValue: config }
      ]
    }
  }
}
