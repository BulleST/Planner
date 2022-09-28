import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes.routing';
import { ClientesComponent } from './clientes.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClientesComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxMaskModule,
    ToastrModule,
    TableModule,
    NgbPopoverModule,
    SharedModule
  ],
  bootstrap: [ClientesComponent]
})
export class ClientesModule { }
