import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BoardgamesComponent } from './boardgames.component';
import { BoardgamesService, BoardgamesServiceConfig } from './boardgames.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    BoardgamesComponent
  ],
  providers: [
    BoardgamesService
  ],
  exports: [ BoardgamesComponent ]
})
export class BoardgamesModule {
  static forRoot(config: BoardgamesServiceConfig): ModuleWithProviders {
    return {
      ngModule: BoardgamesModule,
      providers: [
        { provide: BoardgamesServiceConfig, useValue: config }
      ]
    }
  }
}
