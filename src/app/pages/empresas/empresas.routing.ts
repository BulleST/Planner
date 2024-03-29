import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { DadosCadastraisComponent } from './shared/dados-cadastrais/dados-cadastrais.component';
import { CarteiraSetupGuard } from 'src/app/guards/carteira-setup.guard';

// Clientes
import { ClientesComponent } from './shared/clientes/clientes.component';
import { CreateComponent as Cliente_CreateComponent } from './../clientes/create/create.component';
import { EditComponent as Cliente_EditComponent } from './../clientes/edit/edit.component';
import { DeleteComponent as Cliente_DeleteComponent } from './../clientes/delete/delete.component';
import { DeactivatedComponent as Cliente_DeactivatedComponent } from './../clientes/deactivated/deactivated.component';

// Usuarios
import { UsuariosComponent } from './shared/usuarios/usuarios.component';
import { CreateComponent as Usuario_CreateComponent } from './../usuarios/create/create.component';
import { EditComponent as Usuario_EditComponent } from './../usuarios/edit/edit.component';
import { DeleteComponent as Usuario_DeleteComponent } from './../usuarios/delete/delete.component';
import { DeactivatedComponent as Usuario_DeactivatedComponent } from './../usuarios/deactivated/deactivated.component';

// Produtos
import { ProdutosComponent } from './shared/produtos/produtos.component';
import { CreateComponent as Produto_CreateComponent } from './../produtos/create/create.component';
import { EditComponent as Produto_EditComponent } from './../produtos/edit/edit.component';
import { DeleteComponent as Produto_DeleteComponent } from './../produtos/delete/delete.component';
import { DeactivatedComponent as Produto_DeactivatedComponent } from './../produtos/deactivated/deactivated.component';

// CarteiraSetup
import { SetupComponent } from './shared/setup/setup.component';
import { CreateComponent as CarteiraSetup_CreateComponent } from './../carteira-setup/create/create.component';
import { EditComponent as CarteiraSetup_EditComponent } from './../carteira-setup/edit/edit.component';
import { DeleteComponent as CarteiraSetup_DeleteComponent } from './../carteira-setup/delete/delete.component';
import { DeactivatedComponent as CarteiraSetup_DeactivatedComponent } from './../carteira-setup/deactivated/deactivated.component';

import { DeactivatedComponent } from './deactivated/deactivated.component';

const routes: Routes = [
    { path: '', component: ListComponent, title: 'Planner - Empresas', children: [
        { path: 'habilitar/:empresa_id', component: DeactivatedComponent, title: 'Planner - Habilitar empresa' },
        { path: 'desabilitar/:empresa_id', component: DeactivatedComponent, title: 'Planner - Desabilitar empresa' },
        { path: 'excluir/:empresa_id', component: DeleteComponent, title: 'Planner - Excluir empresa' },
    ] },
    { path: 'editar/:empresa_id', redirectTo: 'editar/:empresa_id/dados-cadastrais', pathMatch: 'prefix' },
    {
        path: 'editar/:empresa_id', component: EditComponent, title: 'Planner - Editar empresa', children: [
            { path: 'dados-cadastrais', component: DadosCadastraisComponent },
            { path: 'clientes', component: ClientesComponent, children: [
                { path: 'cadastrar', component: Cliente_CreateComponent },
                { path: 'editar/:cliente_id', component: Cliente_EditComponent },
                { path: 'excluir/:cliente_id', component: Cliente_DeleteComponent },
                { path: 'habilitar/:cliente_id', component: Cliente_DeactivatedComponent, title: 'Planner - Habilitar cliente' },
                { path: 'desabilitar/:cliente_id', component: Cliente_DeactivatedComponent, title: 'Planner - Desabilitar cliente' },
            ] },
            { path: 'produtos', component: ProdutosComponent, children: [
                    { path: 'cadastrar', component: Produto_CreateComponent, data: { page: 'cadastrar-produto-nova-empresa' } },
                    { path: 'editar/:produto_id', component: Produto_EditComponent },
                    { path: 'excluir/:produto_id', component: Produto_DeleteComponent },
                    { path: 'habilitar/:produto_id', component: Produto_DeactivatedComponent, title: 'Planner - Habilitar produto' },
                    { path: 'desabilitar/:produto_id', component: Produto_DeactivatedComponent, title: 'Planner - Desabilitar produto' },
                ]
            },
            { path: 'usuarios', component: UsuariosComponent, children: [
                    { path: 'cadastrar', component: Usuario_CreateComponent },
                    { path: 'editar/:usuario_id', component: Usuario_EditComponent },
                    { path: 'excluir/:usuario_id', component: Usuario_DeleteComponent },
                    { path: 'habilitar/:usuario_id', component: Usuario_DeactivatedComponent, title: 'Planner - Habilitar usuario' },
                    { path: 'desabilitar/:usuario_id', component: Usuario_DeactivatedComponent, title: 'Planner - Desabilitar usuario' },
                ]
            },
            { path: 'setup/cadastrar', component: CarteiraSetup_CreateComponent, canActivate: [CarteiraSetupGuard] },
            { path: 'setup/editar/:setup_id', component: CarteiraSetup_EditComponent },
            { path: 'setup', component: SetupComponent, children: [
                    { path: 'excluir/:setup_id', component: CarteiraSetup_DeleteComponent },
                    { path: 'habilitar/:setup_id', component: CarteiraSetup_DeactivatedComponent, title: 'Planner - Habilitar setup' },
                    { path: 'desabilitar/:setup_id', component: CarteiraSetup_DeactivatedComponent, title: 'Planner - Desabilitar setup' },
                ]
            },
        ]
    },
    { path: 'cadastrar', redirectTo: 'cadastrar/dados-cadastrais', title: 'Planner - Cadastrar empresa', pathMatch: 'prefix' },
    {
        path: 'cadastrar', component: CreateComponent, title: 'Planner - Cadastrar empresa', children: [
            { path: 'dados-cadastrais', component: DadosCadastraisComponent },
            // { path: 'usuarios', component: UsuariosComponent, children: [
            //         { path: 'cadastrar', component: Usuario_CreateComponent },
            //         { path: 'editar/:usuario_id', component: Usuario_EditComponent },
            //         { path: 'excluir/:usuario_id', component: Usuario_DeleteComponent },
            //     ]
            // },
            // { path: 'clientes', component: ClientesComponent, children: [
            //     { path: 'cadastrar', component: Cliente_CreateComponent },
            //     { path: 'editar/:cliente_id', component: Cliente_EditComponent },
            //     { path: 'excluir/:cliente_id', component: Cliente_DeleteComponent },
            // ] },
            // { path: 'produtos', component: ProdutosComponent, children: [
            //         { path: 'cadastrar', component: Produto_CreateComponent },
            //         { path: 'editar/:produto_id', component: Produto_EditComponent },
            //         { path: 'excluir/:produto_id', component: Produto_DeleteComponent },
            //     ]
            // },
            // { path: 'setup/cadastrar', component: CarteiraSetup_CreateComponent, canActivate: [CarteiraSetupGuard] },
            // { path: 'setup/editar/:setup_id', component: CarteiraSetup_EditComponent },
            // { path: 'setup', component: SetupComponent, children: [
            //         { path: 'excluir/:setup_id', component: CarteiraSetup_DeleteComponent },
            //     ]
            // },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresasRoutingModule { }
