import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UpcomingComponent } from './upcoming.component';
import { UpcomingService, UpcomingServiceConfig } from './upcoming.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    UpcomingComponent
  ],
  providers: [
    UpcomingService
  ],
  exports: [ UpcomingComponent ]
})
export class UpcomingModule {
  static forRoot(config: UpcomingServiceConfig): ModuleWithProviders {
    return {
      ngModule: UpcomingModule,
      providers: [
        { provide: UpcomingServiceConfig, useValue: config }
      ]
    }
  }
}
