import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { DadosCadastraisComponent } from './dados-cadastrais/dados-cadastrais.component';
import { PercentualRiscoComponent } from './percentual-risco/percentual-risco.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { SetupComponent } from './setup/setup.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListSharedComponent } from 'src/app/shared/list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    ClientesComponent,
    DadosCadastraisComponent,
    PercentualRiscoComponent,
    ProdutosComponent,
    SetupComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    NgbPopoverModule,
    TableModule,
    NgxMaskModule.forChild(),
  ],
  exports: [
    ClientesComponent,
    DadosCadastraisComponent,
    PercentualRiscoComponent,
    ProdutosComponent,
    SetupComponent,
    UsuariosComponent
  ]
})
export class EmpresaSharedModule { }
