import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MenuItem } from "primeng/api";
import { Subscription } from "rxjs";
import { Empresa } from "src/app/models/empresa.model";
import { EmpresaService } from "src/app/services/empresa.service";
import { IsMobile, ScreenWidth } from "src/app/utils/mobile";
import { Table } from "src/app/utils/table";
import { validateCnpj } from "src/app/utils/validate-cnpj";

@Component({
    selector: 'app-menu-items',
    templateUrl: './menu-items.component.html',
    styleUrls: ['./menu-items.component.css']
  })
export class MenuItemsComponent implements OnDestroy {
    items: MenuItem[] = [];
    objeto = new Empresa
    erro: string[] = [];
    screen: ScreenWidth = ScreenWidth.lg;
    ScreenWidth = ScreenWidth;
    subscription: Subscription[] = [];
    url = '';
    isEditPage = false;
    isMobile = false;

    constructor(
        private table: Table,
        private toastr: ToastrService,
        private mobile: IsMobile,
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {

        var get = this.mobile.get().subscribe(res => {
            this.screen = res;
            this.isMobile = ![ScreenWidth.lg, ScreenWidth.xl].includes(res);
        });
        this.subscription.push(get);

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        this.items = [
            {
                label: 'Dados Cadastrais',
                routerLink: 'dados-cadastrais',
                iconClass: 'pi pi-id-card',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                },
            },
        ]
        if (this.url.includes('empresas/editar')) {
            this.isEditPage = true;
            this.items = [
                {
                    label: 'Dados Cadastrais',
                    routerLink: 'dados-cadastrais',
                    iconClass: 'pi pi-id-card',
                    command: (event: any) => {
                        this.table.selected.next(undefined);
                    },
                },
                {
                    label: 'Usuários',
                    routerLink: 'usuarios',
                    iconClass: 'pi pi-users',
                    command: (event: any) => {
                        this.table.selected.next(undefined);
                        this.validateDadosCadastrais();
                    }
                },
                {
                    label: 'Clientes',
                    routerLink: 'clientes',
                    iconClass: 'pi pi-user',
                    command: (event: any) => {
                        this.table.selected.next(undefined);
                        this.validateDadosCadastrais();
                    }
                },
                {
                    label: 'Produtos',
                    routerLink: 'produtos',
                    iconClass: 'fa-solid fa-p',
                    command: (event: any) => {
                        this.table.selected.next(undefined);
                        this.validateDadosCadastrais();
                    }
                },
                {
                    label: 'Carteira Setup',
                    iconClass: 'pi pi-wallet',
                    routerLink: 'setup',
                    command: (event: any) => {
                        this.table.selected.next(undefined);
                        this.validateDadosCadastrais();
                    }
                },
            ];
        } 
        var empresa = this.empresaService.empresa.subscribe(res => this.objeto = res);
       this.subscription.push(empresa);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    validateDadosCadastrais() {
        this.erro = [];

        if (!validateCnpj(this.objeto.cnpj)) {
            this.toastr.error('CNPJ inválido.');
            this.erro.push('CNPJ inválido.');
            return false;
        }
        else if (!this.objeto.nome.trim()){
            this.toastr.error('Razão Social inválida.');
            this.erro.push('Razão Social inválida.');
            return false;
        }
        else if ( !this.objeto.email.trim()) {
            this.toastr.error('E-mail inválido.');
            this.erro.push('E-mail inválido.');
            return false;
        }
        else  {
            return true;
        }
    }
}

