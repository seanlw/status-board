import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CountdownComponent } from './countdown.component';
import { CountdownService, CountdownServiceConfig } from './countdown.service';

@NgModule({
  imports: [
    FormsModule,
    NgbModule
  ],
  declarations: [
    CountdownComponent
  ],
  providers: [
    CountdownService
  ],
  exports: [ CountdownComponent ]
})
export class CountdownModule {
  static forRoot(config: CountdownServiceConfig): ModuleWithProviders {
    return {
      ngModule: CountdownModule,
      providers: [
        { provide: CountdownServiceConfig, useValue: config }
      ]
    }
  }
}
