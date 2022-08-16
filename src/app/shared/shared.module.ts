import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TableModule } from "primeng/table";
import {DragDropModule} from 'primeng/dragdrop';
import { FormUsuarioComponent } from "./usuarios/form/form.component";
import { FormProdutoComponent } from './produtos/form/form.component';
import { NgxMaskModule } from "ngx-mask";
import { ListComponent } from "./list/list.component";

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
        DragDropModule
    ],
    exports: [
        FormUsuarioComponent,
        FormProdutoComponent,
        ListComponent
    ],
})
export class SharedModule {
   
}
