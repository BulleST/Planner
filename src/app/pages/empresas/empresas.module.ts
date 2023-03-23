import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas.routing';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuModule } from 'primeng/menu';

import { EmpresasComponent } from './empresas.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';

import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpresaSharedModule } from './shared/empresa-shared.module';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
    declarations: [
        EmpresasComponent,
        ListComponent,
        DeleteComponent,
        CreateComponent,
        EditComponent,
        DeactivatedComponent,
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
        StepsModule,
        CardModule,
        SharedModule,
        EmpresaSharedModule,
        MenuModule,
        ButtonModule,
    ],
    bootstrap: [EmpresasComponent]
})
export class EmpresasModule { }
