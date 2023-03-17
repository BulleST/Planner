import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faChevronLeft, faCity, faCreditCardAlt, faEllipsisV, faFilter, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Loading } from 'src/app/utils/loading';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    faChevronLeft = faChevronLeft;
    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    faCity = faCity;
    faUsers = faUsers;
    faFilter = faFilter;
    objeto: Empresa = new Empresa;
    erro: any[] = [];
    loading = false;
    items: MenuItem[] = [];
    index: number = 1;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private crypto: Crypto,
        private table: Table,
    ) {
        this.table.loading.subscribe(res => this.loading = res);
        let id = 0;
        this.items = [
            {
                id: (++id).toString(),
                label: 'Dados Cadastrais',
                routerLink: 'dados-cadastrais',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                },
                icon: faCreditCardAlt.toString()
            },
            {
                id: (++id).toString(),
                label: 'Usuários',
                routerLink: 'usuarios',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
            {
                id: (++id).toString(),
                label: 'Clientes',
                routerLink: 'clientes',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
            {
                id: (++id).toString(),
                label: 'Produtos',
                routerLink: 'produtos',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }

            },
            {
                id: (++id).toString(),
                label: 'Carteira Setup',
                routerLink: 'setup',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
            {
                id: (++id).toString(),
                label: 'Percentual de Risco',
                routerLink: 'percentual-risco',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                    this.validateDadosCadastrais();
                }
            },
        ];

        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
            this.objeto.produto = this.objeto.produto ?? []; 
            this.objeto.percentualRisco = this.objeto.percentualRisco ?? []; 
            this.objeto.cliente = this.objeto.cliente ?? []; 
            this.objeto.account = this.objeto.account ?? []; 
            this.objeto.carteiraSetup = this.objeto.carteiraSetup ?? []; 
        });  

        activatedRoute.params.subscribe(p => {
            if (p['empresa_id']) {
                this.objeto.id = this.crypto.decrypt(p['empresa_id']);
                this.empresaService.get(this.objeto.id).subscribe({
                    next: res => {
                        this.objeto = res;
                        this.empresaService.empresaObject.next(res);
                    },
                    error: err => {
                        this.voltar();
                    }
                })
            } else {
                this.voltar();
            }
        })
    }

    ngOnInit(): void {
    }

    voltar() {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }

    validateDadosCadastrais() {
        let valid = true;
        this.erro = [];
        if (this.objeto.cnpj.toString().padStart(14, '0').length != 14) {
            valid = false;
        }
        else if (parseInt(this.objeto.cnpj.toString()) == 0) {
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
}
