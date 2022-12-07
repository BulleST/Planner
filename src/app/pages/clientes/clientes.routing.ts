import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannerComponent } from './planner/planner.component';
import { DeleteComponent } from './delete/delete.component';
import { InvestimentoFormComponent } from './planner/investimento-form/investimento-form.component';
import { ListComponent } from './list/list.component';
import { ProdutoFormComponent } from './planner/produto-form/produto-form.component';
import { ProdutoGuard } from './planner/produto.guard';
import { DeletePlannerComponent } from './planner/delete-planner/delete-planner.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: CreateComponent },
        { path: 'editar/:cliente_id', component: EditComponent },
        { path: 'excluir/:cliente_id', component: DeleteComponent },
    ]},
    { path: 'planner', component: PlannerComponent, children: [
        { path: 'investimento', component: InvestimentoFormComponent },
        { path: 'produto', component: ProdutoFormComponent, canActivate: [ProdutoGuard] },
        { path: 'excluir/:planner_id', component: DeletePlannerComponent },
    ] },
    { path: 'planner/:cliente_id', component: PlannerComponent, children: [
        { path: 'investimento', component: InvestimentoFormComponent },
        { path: 'produto', component: ProdutoFormComponent, canActivate: [ProdutoGuard] },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
