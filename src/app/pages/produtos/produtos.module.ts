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


@NgModule({
    declarations: [
        ProdutosComponent,
        CreateComponent,
        EditComponent,
        DeleteComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        ProdutosRoutingModule,
        SharedModule,
        FontAwesomeModule
    ],
    exports: [
        CreateComponent,
    ]
})
export class ProdutosModule { }
