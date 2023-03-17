import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faChevronLeft, faCity, faCreditCard, faCreditCardAlt, faEllipsisV, faHandHoldingDollar, faPercent, faTimes, faUsers, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
// import { MenuItem } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { Empresa } from 'src/app/models/empresa.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';

export interface MenuItem {
    id: number,
    label: string,
    routerLink: string,
    command: (event: any) => void,
    faIcon?: IconDefinition,
    iconClass?: string,
}

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
    faChevronLeft = faChevronLeft;
    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    faCity = faCity;
    objeto: Empresa = new Empresa;
    erro: any[] = [];
    loading = false;

    items: MenuItem[] = [];
    index: number = 1;
    cnpjValid = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private alert: AlertService,
        private table: Table
    ) {
        if ( this.empresaService.object == undefined)
            this.empresaService.setObject(new Empresa);
            
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
            this.objeto.produto = this.objeto.produto ?? []; 
            this.objeto.percentualRisco = this.objeto.percentualRisco ?? []; 
            this.objeto.cliente = this.objeto.cliente ?? []; 
            this.objeto.account = this.objeto.account ?? []; 
            this.objeto.carteiraSetup = this.objeto.carteiraSetup ?? []; 
        });   
        let id = 0;
        this.items =  [
            { 
                id: ++id,
                // id: (++id).toString(),
                label: 'Dados Cadastrais',
                routerLink: 'dados-cadastrais',
                faIcon: faCreditCard,
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                },
            },
            { 
                id: ++id,
                // id: (++id).toString(),
                label: 'Usuários',
                routerLink: 'usuarios',
                faIcon: faUsers,
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
            { 
                id: ++id,
                // id: (++id).toString(),
                label: 'Clientes',
                routerLink: 'clientes',
                iconClass: 'pi pi-wallet',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
            { 
                id: ++id,
                // id: (++id).toString(),
                label: 'Produtos',
                routerLink: 'produtos',
                faIcon: faHandHoldingDollar,
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
               
            },
            { 
                id: ++id,
                // id: (++id).toString(),
                label: 'Carteira Setup',
                iconClass: 'pi pi-wallet',
                routerLink: 'setup',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
            { 
                id: ++id,
                // id: (++id).toString(),
                label: 'Percentual de Risco',
                routerLink: 'percentual-risco',
                faIcon: faPercent,
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
        ];
    }

    ngOnInit(): void {
    }
            
    ngOnDestroy(): void {
        this.empresaService.setObject(new Empresa)
    }

    voltar() {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }

    validateDadosCadastrais() {
        let valid = true;
        this.erro = [];if (parseInt(this.objeto.cnpj.toString()) == 0) {
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
            this.router.navigate(['dados-cadastrais'], { relativeTo: this.activatedRoute })
        }

        return valid;
    }

    chan() {
      this.index += 1;
    }

}
