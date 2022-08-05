import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas.routing';
import { EmpresasComponent } from './empresas.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    EmpresasComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    TableModule,
    FontAwesomeModule,
    ToastrModule,
    FormsModule,
    NgbPopoverModule,
    NgxMaskModule.forChild(),
  ],
  bootstrap: [EmpresasComponent]
})
export class EmpresasModule { }
