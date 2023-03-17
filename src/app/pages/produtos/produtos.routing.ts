import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DeactivatedGuard } from 'src/app/shared/deactivated/deactivated.guard';
import { CreateComponent } from './create/create.component';
import { DeactivatedComponent } from './deactivated/deactivated.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar', component: CreateComponent },
        { path: 'editar/:produto_id', component: EditComponent },
        { path: 'excluir/:produto_id', component: DeleteComponent },
        {
            path: 'habilitar/:produto_id',
            component: DeactivatedComponent,
            title: 'Planner - Habilitar produto'
        },
        {
            path: 'desabilitar/:produto_id',
            component: DeactivatedComponent,
            title: 'Planner - Desabilitar produto '
        },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
