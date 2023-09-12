import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { DragDropModule as Material_DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropModule as Primeng_DragDropModule } from 'primeng/dragdrop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { DropdownModule } from "primeng/dropdown";
import { PickListModule } from 'primeng/picklist';
import { TableModule } from "primeng/table";
import { ChartModule } from 'primeng/chart';
import { StepsModule } from 'primeng/steps';
import { ToastrModule } from "ngx-toastr";
import { NgxMaskModule } from "ngx-mask";

import { FormUsuarioComponent } from "./usuarios/form/form.component";
import { FormCarteiraSetupComponent } from "./carteira-setup/form/form.component";
import { FormProdutoComponent } from './produtos/form/form.component';
import { ListSharedComponent } from "./list/list.component";
import { FormClienteComponent } from './cliente/form/form.component';
import { EmpresaSelectComponent } from './empresa-select/empresa-select.component';
import { DeactivatedComponent } from "./deactivated/deactivated.component";
import { InputNumberComponent } from './input-number/input-number.component';
import { TypeofPipe } from "../utils/typeof.pipe";

@NgModule({
    declarations: [
        FormUsuarioComponent,
        FormProdutoComponent,
        FormCarteiraSetupComponent,
        FormClienteComponent,
        ListSharedComponent,
        EmpresaSelectComponent,
        DeactivatedComponent,
        InputNumberComponent,
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
        StepsModule,
    ],
    exports: [
        FormUsuarioComponent,
        FormProdutoComponent,
        FormCarteiraSetupComponent,
        FormClienteComponent,
        ListSharedComponent,
        EmpresaSelectComponent,
        DeactivatedComponent,
        InputNumberComponent
    ],
})
export class SharedModule {

}
