import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { ListComponent } from './list/list.component';
import { PlannerComponent } from './planner/planner.component';
import { DeleteComponent } from './delete/delete.component';
import { InvestimentoFormComponent } from './planner/investimento-form/investimento-form.component';
import { RemoverInvestimentoComponent } from './planner/investimento-remover/remover-investimento.component';
import { ProdutoFormComponent } from './planner/produto-form/produto-form.component';
import { RemoverProdutoComponent } from './planner/produto-remover/remover-produto.component';
import { DropdownModule } from 'primeng/dropdown';
import { ClientesRoutingModule } from './clientes.routing';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeletePlannerComponent } from './planner/delete-planner/delete-planner.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    PlannerComponent,
    ListComponent,
    DeleteComponent,
    InvestimentoFormComponent,
    RemoverInvestimentoComponent,
    ProdutoFormComponent,
    RemoverProdutoComponent,
    DeletePlannerComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxMaskModule,
    ToastrModule,
    TableModule,
    NgbPopoverModule,
    DropdownModule,
    SlickCarouselModule,
    ChartModule,
    SharedModule
  ],
  bootstrap: [ListComponent]
})
export class ClientesModule { }
