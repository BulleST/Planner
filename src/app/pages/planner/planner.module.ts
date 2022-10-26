import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { PlannerComponent } from './planner/planner.component';
import { DeleteComponent } from './delete/delete.component';
import { InvestimentoFormComponent } from './planner/investimento-form/investimento-form.component';
import { RemoverInvestimentoComponent } from './planner/investimento-remover/remover-investimento.component';
import { ProdutoFormComponent } from './planner/produto-form/produto-form.component';
import { RemoverProdutoComponent } from './planner/produto-remover/remover-produto.component';
import { DropdownModule } from 'primeng/dropdown';
import { PlannerRoutingModule } from './planner.routing';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    PlannerComponent,
    ListComponent,
    DeleteComponent,
    InvestimentoFormComponent,
    RemoverInvestimentoComponent,
    ProdutoFormComponent,
    RemoverProdutoComponent,
  ],
  imports: [
    CommonModule,
    PlannerRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxMaskModule,
    ToastrModule,
    TableModule,
    NgbPopoverModule,
    SharedModule,
    DropdownModule,
    SlickCarouselModule,
    ChartModule,
  ],
  bootstrap: [ListComponent]
})
export class PlannerModule { }
