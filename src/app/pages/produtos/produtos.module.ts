import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos.routing';
import { ProdutosComponent } from './produtos.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeactivatedComponent } from './deactivated/deactivated.component';

@NgModule({
    declarations: [
        ProdutosComponent,
        CreateComponent,
        EditComponent,
        DeleteComponent,
        ListComponent,
        DeactivatedComponent,
    ],
    imports: [
        CommonModule,
        ProdutosRoutingModule,
        SharedModule,
        FontAwesomeModule
    ],
    bootstrap: [ProdutosComponent],
    exports: [
        CreateComponent,
    ],
    providers: [],
})
export class ProdutosModule { }
