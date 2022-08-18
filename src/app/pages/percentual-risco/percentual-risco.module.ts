import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PercentualRiscoRoutingModule } from './percentual-risco.routing';
import { PercentualRiscoComponent } from './percentual-risco.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    PercentualRiscoComponent,
    ListComponent,
    EditComponent,
    CreateComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    PercentualRiscoRoutingModule,
    SharedModule
  ],
  exports: [
    CreateComponent
  ],
  bootstrap: [PercentualRiscoComponent]
})
export class PercentualRiscoModule { }
