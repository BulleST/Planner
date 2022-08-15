import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

import { DadosCadastraisComponent } from './create/dados-cadastrais/dados-cadastrais.component';
import { ProdutosComponent } from './create/produtos/produtos.component';
import { UsuariosComponent } from './create/usuarios/usuarios.component';
import { SetupComponent } from './create/setup/setup.component';

const routes: Routes = [
    {
        path: '', component: ListComponent, children: [
        ]
    },
    { path: 'excluir/:id', component: DeleteComponent },
    { path: 'editar/:id', component: EditComponent },
    { path: 'cadastrar', component: CreateComponent, children: [
        { path: 'dados-cadastrais', component: DadosCadastraisComponent },
        { path: 'produtos', component: ProdutosComponent },
        { path: 'clientes', component: ClientesComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'setup', component: SetupComponent },
    ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresasRoutingModule { }
