import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { CarteiraSetupRoutingModule } from './carteira-setup.routing';
import { CarteiraSetupComponent } from './carteira-setup.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteRelComponent } from './delete-rel/delete-rel.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [
        CarteiraSetupComponent,
        ListComponent,
        CreateComponent,
        EditComponent,
        DeleteComponent,
        DeleteRelComponent
    ],
    imports: [
        CommonModule,
        CarteiraSetupRoutingModule,
        SharedModule,
        ToastrModule,
        FormsModule,
        NgxMaskModule.forChild()
    ],
    exports: [
        CreateComponent
    ],
    bootstrap: [CarteiraSetupComponent]
})
export class CarteiraSetupModule { }
