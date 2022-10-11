import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannerComponent } from './planner/planner.component';
import { DeleteComponent } from './delete/delete.component';
import { InvestimentoGuard } from './investimento.guard';
import { InvestimentoFormComponent } from './planner/investimento-form/investimento-form.component';
import { RemoverInvestimentoComponent } from './planner/investimento-remover/remover-investimento.component';
import { ListComponent } from './list/list.component';
import { ProdutoFormComponent } from './planner/produto-form/produto-form.component';
import { RemoverProdutoComponent } from './planner/produto-remover/remover-produto.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'excluir/:cliente_id', component: DeleteComponent },
    ]},
    { path: 'planner', component: PlannerComponent, children: [
        { path: 'investimento', component: InvestimentoFormComponent, canActivate: [ InvestimentoGuard ] },
        { path: 'produto/:produto_id', component: ProdutoFormComponent },
        { path: 'produto', component: ProdutoFormComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerRoutingModule { }
