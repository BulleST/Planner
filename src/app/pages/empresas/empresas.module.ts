import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas.routing';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { EmpresasComponent } from './empresas.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { DadosCadastraisComponent as Create_Empresa_DadosCadastraisComponent } from './create/dados-cadastrais/dados-cadastrais.component';
import { FinalizarComponent as Create_Empresa_FinalizarComponent } from './create/finalizar/finalizar.component';
import { ProdutosComponent as Create_Empresa_ProdutosComponent } from './create/produtos/produtos.component';
import { SetupComponent as Create_Empresa_SetupComponent } from './create/setup/setup.component';
import { UsuariosComponent as Create_Empresa_UsuariosComponent } from './create/usuarios/usuarios.component';

import { EditComponent } from './edit/edit.component';
import { ClientesComponent as Edit_Empresa_ClientesComponent } from './edit/clientes/clientes.component';
import { ProdutosComponent as Edit_Empresa_ProdutosComponent } from './edit/produtos/produtos.component';
import { SetupComponent as Edit_Empresa_SetupComponent } from './edit/setup/setup.component';
import { UsuariosComponent as Edit_Empresa_UsuariosComponent } from './edit/usuarios/usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        EmpresasComponent,
        ListComponent,
        DeleteComponent,
        // CREATE COMPONENT STEPS
        CreateComponent,
        Create_Empresa_DadosCadastraisComponent,
        Create_Empresa_UsuariosComponent,
        Create_Empresa_ProdutosComponent,
        Create_Empresa_SetupComponent,
        Create_Empresa_FinalizarComponent,
        // EDIT COMPONENT STEPS
        EditComponent,
        Edit_Empresa_ClientesComponent,
        Edit_Empresa_ProdutosComponent,
        Edit_Empresa_SetupComponent,
        Edit_Empresa_UsuariosComponent,

    ],
    imports: [
        CommonModule,
        EmpresasRoutingModule,
        TableModule,
        FontAwesomeModule,
        ToastrModule,
        FormsModule,
        NgbPopoverModule,
        NgxMaskModule.forChild(),
        StepsModule,
        CardModule,
        SharedModule
    ],
    bootstrap: [EmpresasComponent]
})
export class EmpresasModule { }
