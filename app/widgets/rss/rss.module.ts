import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RssComponent } from './rss.component';
import { RssService, RssServiceConfig } from './rss.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    RssComponent
  ],
  providers: [
    RssService
  ],
  exports: [ RssComponent ]
})
export class RssModule {
  static forRoot(config: RssServiceConfig): ModuleWithProviders {
    return {
      ngModule: RssModule,
      providers: [
        { provide: RssServiceConfig, useValue: config }
      ]
    }
  }
}
