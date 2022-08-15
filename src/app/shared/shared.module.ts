import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { TableModule } from "primeng/table";

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
        NgbPopoverModule,
        FontAwesomeModule,
        TableModule,
        NgxMaskModule.forChild(),
    ],
    exports: [
        FormUsuarioComponent,
        FormProdutoComponent,
        ListComponent
    ],
})
export class SharedModule {
   
}
