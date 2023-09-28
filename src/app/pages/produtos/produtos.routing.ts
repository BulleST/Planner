import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DeactivatedGuard } from 'src/app/shared/deactivated/deactivated.guard';
import { CreateComponent } from './create/create.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path: '', component: ListComponent, title: 'Planner - Produtos', children: [
        { path: 'cadastrar', component: CreateComponent, title: 'Planner - Cadastrar produto' },
        { path: 'editar/:produto_id', component: EditComponent, title: 'Planner - Editar produto' },
        { path: 'excluir/:produto_id', component: DeleteComponent, title: 'Planner - Excluir produto' },
        { path: 'habilitar/:produto_id', component: DeactivatedComponent, title: 'Planner - Habilitar produto' },
        { path: 'desabilitar/:produto_id', component: DeactivatedComponent, title: 'Planner - Desabilitar produto '},
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
