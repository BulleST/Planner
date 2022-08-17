import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './edit/clientes/clientes.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

import { DadosCadastraisComponent } from './create/dados-cadastrais/dados-cadastrais.component';
import { ProdutosComponent } from './create/produtos/produtos.component';
import { SetupComponent } from './create/setup/setup.component';

import { UsuariosComponent } from './create/usuarios/usuarios.component';
import { CreateComponent as Usuario_CreateComponent } from './../usuarios/create/create.component';

import { CreateComponent as Produto_CreateComponent } from './../produtos/create/create.component';

import { CreateComponent as CarteiraSetup_CreateComponent } from './../carteira-setup/create/create.component';
import { CarteiraSetupGuard } from 'src/app/helpers/carteira-setup.guard';
import { FinalizarComponent } from './create/finalizar/finalizar.component';

const routes: Routes = [
    {
        path: '', component: ListComponent, children: [
        ]
    },
    { path: 'excluir/:id', component: DeleteComponent },
    { path: 'editar/:id', component: EditComponent },
    { path: 'cadastrar', component: CreateComponent, children: [
        { path: 'dados-cadastrais', component: DadosCadastraisComponent },
        { path: 'produtos', component: ProdutosComponent, children: [
            { path: 'cadastrar', component: Produto_CreateComponent  }
        ] },
        { path: 'clientes', component: ClientesComponent },
        { path: 'usuarios', component: UsuariosComponent, children: [
            { path: 'cadastrar', component: Usuario_CreateComponent },
        ] },
        { path: 'setup', component: SetupComponent, children: [
            { path: 'cadastrar', component: CarteiraSetup_CreateComponent, 
                // canActivate: [CarteiraSetupGuard] 
            }
        ] },
        { path: 'finalizar', component: FinalizarComponent },
    ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresasRoutingModule { }
