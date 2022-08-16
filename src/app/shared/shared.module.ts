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
@NgModule({
    declarations: [
        FormUsuarioComponent,
        FormProdutoComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        TableModule,
        NgxMaskModule.forChild(),
        Primeng_DragDropModule,
        NgbPopoverModule,
        Material_DragDropModule
    ],
    exports: [
        FormUsuarioComponent,
        FormProdutoComponent,
        ListComponent
    ],
})
export class SharedModule {
   
}
