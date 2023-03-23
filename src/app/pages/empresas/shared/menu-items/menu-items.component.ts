import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MenuItem } from "primeng/api";
import { Empresa } from "src/app/models/empresa.model";
import { EmpresaService } from "src/app/services/empresa.service";
import { IsMobile, ScreenWidth } from "src/app/utils/mobile";
import { Table } from "src/app/utils/table";

@Component({
    selector: 'app-menu-items',
    templateUrl: './menu-items.component.html',
    styleUrls: ['./menu-items.component.css']
  })
export class MenuItemsComponent implements OnInit {
    items: MenuItem[] = [];
    objeto = new Empresa
    erro: string[] = [];
    screen: ScreenWidth = ScreenWidth.lg;
    ScreenWidth = ScreenWidth;
    constructor(
        private table: Table,
        private toastr: ToastrService,
        private isMobile: IsMobile,
        private empresaService: EmpresaService,
    ) {
        this.isMobile.get().subscribe(res => {
            this.screen = res;
        })
        this.items = [
            {
                label: 'Dados Cadastrais',
                routerLink: 'dados-cadastrais',
                iconClass: 'pi pi-id-card',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                },
            },
            {
                label: 'Usuários',
                routerLink: 'usuarios',
                iconClass: 'pi pi-users',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
            {
                label: 'Clientes',
                routerLink: 'clientes',
                iconClass: 'pi pi-user',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
            {
                label: 'Produtos',
                routerLink: 'produtos',
                iconClass: 'fa-solid fa-p',
                // // faIcon: faHandHoldingDollar,
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }

            },
            {
                label: 'Carteira Setup',
                iconClass: 'pi pi-wallet',
                routerLink: 'setup',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
        ];
       this.empresaService.empresa.subscribe(res => this.objeto = res);
    }

    ngOnInit(): void {
        
    }

    validateDadosCadastrais() {
        let valid = true;
        this.erro = []; 
        if (parseInt(this.objeto.cnpj.toString()) == 0) {
            valid = false;
        }
        else if (!this.objeto.nome.trim() || !this.objeto.email.trim()) {
            valid = false;
        }
        else {
            valid = true;
        }
        if (!valid) {
            this.toastr.error('Dados cadastrais inválidos.');
            this.erro.push('Dados cadastrais inválidos');
        }
        return valid;
    }
}

