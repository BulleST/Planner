import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [
        { path: 'cadastrar/:empresa_id', component: CreateComponent },
        { path: 'editar/:setup_id', component: EditComponent },
        { path: 'excluir/:setup_id', component: DeleteComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarteiraSetupRoutingModule { }
