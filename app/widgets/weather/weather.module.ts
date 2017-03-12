import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WeatherComponent } from './weather.component';
import { WeatherService, WeatherServiceConfig } from './weather.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    WeatherComponent
  ],
  providers: [
    WeatherService
  ],
  exports: [ WeatherComponent ]
})
export class WeatherModule {
  static forRoot(config: WeatherServiceConfig): ModuleWithProviders {
    return {
      ngModule: WeatherModule,
      providers: [
        { provide: WeatherServiceConfig, useValue: config }
      ]
    }
  }
}
