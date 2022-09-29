import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DragDropModule as Material_DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TableModule } from "primeng/table";
import { ChartModule } from 'primeng/chart';
import { DragDropModule as Primeng_DragDropModule } from 'primeng/dragdrop';
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { DropdownModule } from "primeng/dropdown";
import { NgxMaskModule } from "ngx-mask";
import { ToastrModule } from "ngx-toastr";
import { FormCreateUsuarioComponent } from "./usuarios/form-create/form-create.component";
import { FormProdutoComponent } from './produtos/form/form.component';
import { ListComponent } from "./list/list.component";
import { FormCarteiraSetupComponent } from "./carteira-setup/form/form.component";
import { FormPercentualRiscoComponent } from "./percentual-risco/form/form.component";
import { FormEditUsuarioComponent } from "./usuarios/form-edit/form-edit.component";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PickListModule } from 'primeng/picklist';
import { FormClienteComponent } from "./cliente/form.component";
import {StepsModule} from 'primeng/steps';

@NgModule({
    declarations: [
        FormCreateUsuarioComponent,
        FormEditUsuarioComponent,
        FormProdutoComponent,
        FormCarteiraSetupComponent,
        FormClienteComponent,
        FormPercentualRiscoComponent,
        ListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        TableModule,
        NgxMaskModule.forChild(),
        Primeng_DragDropModule,
        Material_DragDropModule,
        NgbPopoverModule,
        DropdownModule,
        ToastrModule,
        ChartModule,
        MatAutocompleteModule,
        PickListModule,
        StepsModule
    ],
    exports: [
        FormCreateUsuarioComponent,
        FormEditUsuarioComponent,
        FormProdutoComponent,
        FormCarteiraSetupComponent,
        FormPercentualRiscoComponent,
        FormClienteComponent,
        ListComponent,
    ],
})
export class SharedModule {

}
