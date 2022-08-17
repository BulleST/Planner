import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TableModule } from "primeng/table";
import { DragDropModule as Primeng_DragDropModule} from 'primeng/dragdrop';
import { FormUsuarioComponent } from "./usuarios/form/form.component";
import { FormProdutoComponent } from './produtos/form/form.component';
import { NgxMaskModule } from "ngx-mask";
import { ListComponent } from "./list/list.component";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { DragDropModule as Material_DragDropModule } from '@angular/cdk/drag-drop';
import { FormCarteiraSetupComponent } from "./carteira-setup/form/form.component";
import { DropdownModule } from "primeng/dropdown";
@NgModule({
    declarations: [
        FormUsuarioComponent,
        FormProdutoComponent,
        FormCarteiraSetupComponent,
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
    ],
    exports: [
        FormUsuarioComponent,
        FormProdutoComponent,
        FormCarteiraSetupComponent,
        ListComponent,
    ],
})
export class SharedModule {
   
}
