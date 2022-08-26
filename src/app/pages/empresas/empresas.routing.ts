import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './edit/clientes/clientes.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';


// Usuarios
import { UsuariosComponent } from './create/usuarios/usuarios.component';
import { CreateComponent as Usuario_CreateComponent } from './../usuarios/create/create.component';
import { EditComponent as Usuario_EditComponent } from './../usuarios/edit/edit.component';
import { DeleteComponent as Usuario_DeleteComponent } from './../usuarios/delete/delete.component';

// Produtos
import { ProdutosComponent } from './create/produtos/produtos.component';
import { CreateComponent as Produto_CreateComponent } from './../produtos/create/create.component';
import { EditComponent as Produto_EditComponent } from './../produtos/edit/edit.component';
import { DeleteComponent as Produto_DeleteComponent } from './../produtos/delete/delete.component';

// CarteiraSetup
import { SetupComponent } from './create/setup/setup.component';
import { CreateComponent as CarteiraSetup_CreateComponent } from './../carteira-setup/create/create.component';
import { EditComponent as CarteiraSetup_EditComponent } from './../carteira-setup/edit/edit.component';
import { DeleteComponent as CarteiraSetup_DeleteComponent } from './../carteira-setup/delete/delete.component';
import { CarteiraSetupGuard } from 'src/app/helpers/carteira-setup.guard';


// PercentualRisco
import { PercentualRiscoComponent } from './create/percentual-risco/percentual-risco.component';
import { CreateComponent as PercentualRisco_CreateComponent } from './../percentual-risco/create/create.component';
import { EditComponent as PercentualRisco_EditComponent } from './../percentual-risco/edit/edit.component';
import { DeleteComponent as PercentualRisco_DeleteComponent } from './../percentual-risco/delete/delete.component';


import { DadosCadastraisComponent } from './create/dados-cadastrais/dados-cadastrais.component';

const routes: Routes = [
    { path: '', component: ListComponent, children: [] },
    { path: 'excluir/:id', component: DeleteComponent },
    { path: 'editar/:id', component: EditComponent, children: [
        { path: 'produtos', component: ProdutosComponent, children: [
            { path: 'cadastrar', component: Produto_CreateComponent  },
            { path: 'editar/:id', component: Produto_EditComponent  },
            { path: 'excluir/:id', component: Produto_DeleteComponent  },
        ] },
        { path: 'clientes', component: ClientesComponent },
        { path: 'usuarios', component: UsuariosComponent, children: [
            { path: 'cadastrar', component: Usuario_CreateComponent },
            { path: 'editar/:id', component: Usuario_EditComponent  },
            { path: 'excluir/:id', component: Usuario_DeleteComponent  },
        ] },
        { path: 'setup', component: SetupComponent, children: [
            { path: 'cadastrar', component: CarteiraSetup_CreateComponent, canActivate: [CarteiraSetupGuard] },
            { path: 'editar/:id', component: CarteiraSetup_EditComponent  },
            { path: 'excluir/:id', component: CarteiraSetup_DeleteComponent  },
        ] },
        { path: 'percentual-risco', component: PercentualRiscoComponent, children: [
            { path: 'cadastrar', component: PercentualRisco_CreateComponent },
            { path: 'editar/:id', component: PercentualRisco_EditComponent  },
            { path: 'excluir/:id', component: PercentualRisco_DeleteComponent  },
        ] },
    ]  },
    { path: 'cadastrar', redirectTo: 'cadastrar/dados-cadastrais', pathMatch: 'prefix' },
    { path: 'cadastrar', component: CreateComponent, children: [
        { path: 'dados-cadastrais', component: DadosCadastraisComponent },
        { path: 'produtos', component: ProdutosComponent, children: [
            { path: 'cadastrar', component: Produto_CreateComponent  },
            { path: 'editar/:id', component: Produto_EditComponent  },
            { path: 'excluir/:id', component: Produto_DeleteComponent  },
        ] },
        { path: 'clientes', component: ClientesComponent },
        { path: 'usuarios', component: UsuariosComponent, children: [
            { path: 'cadastrar', component: Usuario_CreateComponent },
            { path: 'editar/:id', component: Usuario_EditComponent  },
            { path: 'excluir/:id', component: Usuario_DeleteComponent  },
        ] },
        { path: 'setup', component: SetupComponent, children: [
            { path: 'cadastrar', component: CarteiraSetup_CreateComponent, canActivate: [CarteiraSetupGuard] },
            { path: 'editar/:id', component: CarteiraSetup_EditComponent  },
            { path: 'excluir/:id', component: CarteiraSetup_DeleteComponent  },
        ] },
        { path: 'percentual-risco', component: PercentualRiscoComponent, children: [
            { path: 'cadastrar', component: PercentualRisco_CreateComponent },
            { path: 'editar/:id', component: PercentualRisco_EditComponent  },
            { path: 'excluir/:id', component: PercentualRisco_DeleteComponent  },
        ] },
    ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresasRoutingModule { }
