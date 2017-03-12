import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PingdomComponent } from './pingdom.component';
import { PingdomService, PingdomServiceConfig } from './pingdom.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    PingdomComponent
  ],
  providers: [
    PingdomService
  ],
  exports: [ PingdomComponent ]
})
export class PingdomModule {
  static forRoot(config: PingdomServiceConfig): ModuleWithProviders {
    return {
      ngModule: PingdomModule,
      providers: [
        { provide: PingdomServiceConfig, useValue: config }
      ]
    }
  }
}
