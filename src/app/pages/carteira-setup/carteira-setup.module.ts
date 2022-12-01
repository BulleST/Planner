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
import { NgxMaskModule } from 'ngx-mask';
import { ChartModule } from 'primeng/chart';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
    declarations: [
        CarteiraSetupComponent,
        ListComponent,
        CreateComponent,
        EditComponent,
        DeleteComponent,
    ],
    imports: [
        CommonModule,
        CarteiraSetupRoutingModule,
        SharedModule,
        ToastrModule,
        FormsModule,
        NgxMaskModule.forChild(),
        ChartModule,
        NgbPopoverModule,
        FontAwesomeModule,
        TableModule,
        SliderModule,
        ProgressBarModule
    ],
    exports: [
        CreateComponent
    ],
    bootstrap: [CarteiraSetupComponent]
})
export class CarteiraSetupModule { }
