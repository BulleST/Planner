import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PercentualRiscoRoutingModule } from './percentual-risco-routing.module';
import { PercentualRiscoComponent } from './percentual-risco.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    PercentualRiscoComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    PercentualRiscoRoutingModule
  ]
})
export class PercentualRiscoModule { }
