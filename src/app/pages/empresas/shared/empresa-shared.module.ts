import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { DadosCadastraisComponent } from './dados-cadastrais/dados-cadastrais.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { SetupComponent } from './setup/setup.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { NgxMaskModule } from 'ngx-mask';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuItems } from './menu-items/menu-items';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    ClientesComponent,
    DadosCadastraisComponent,
    ProdutosComponent,
    SetupComponent,
    UsuariosComponent,
    MenuItemsComponent
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
    ButtonModule,
    MenuModule,
    StepsModule,
    PanelModule,
  ],
  exports: [
    ClientesComponent,
    DadosCadastraisComponent,
    ProdutosComponent,
    SetupComponent,
    UsuariosComponent,
    MenuItemsComponent,
  ],
  providers: [
    MenuItems
  ]
})
export class EmpresaSharedModule { }
