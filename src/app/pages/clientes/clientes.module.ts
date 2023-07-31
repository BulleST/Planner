import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { ListComponent } from './list/list.component';
import { PlannerComponent } from './planner/planner.component';
import { DeleteComponent } from './delete/delete.component';
import { FormInvestimentoComponent } from './planner/form-investimento/form-investimento.component';
import { FormProdutoComponent } from './planner/form-produto/form-produto.component';
import { DropdownModule } from 'primeng/dropdown';
import { ClientesRoutingModule } from './clientes.routing';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeletePlannerComponent } from './planner/delete-planner/delete-planner.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GraficoComparativoComponent } from './planner/grafico-comparativo/grafico-comparativo.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { PatrimonioPorIdadeComponent } from './planner/patrimonio-por-idade/patrimonio-por-idade.component';
import { InputTextModule } from 'primeng/inputtext';
import { VerPlannerReadonlyComponent } from './ver-planner-readonly/ver-planner-readonly.component';

@NgModule({
  declarations: [
    PlannerComponent,
    ListComponent,
    DeleteComponent,
    FormInvestimentoComponent,
    FormProdutoComponent,
    DeletePlannerComponent,
    CreateComponent,
    EditComponent,
    GraficoComparativoComponent,
    DeactivatedComponent,
    PatrimonioPorIdadeComponent,
    VerPlannerReadonlyComponent
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
    ChartModule,
    SharedModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  bootstrap: [ListComponent]
})
export class ClientesModule { }
