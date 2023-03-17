import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios.routing';
import { UsuariosComponent } from './usuarios.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    UsuariosComponent,
    CreateComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ToastrModule,
    SharedModule,
    FontAwesomeModule,
    TableModule,
  ],
  exports: [
    CreateComponent
  ]
})
export class UsuariosModule { }
