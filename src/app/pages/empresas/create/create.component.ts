import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faChevronLeft, faCity, faCreditCardAlt, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';

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
            console.log(res)
        });   
        let id = 0;
        this.items =  [
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
                }
            },
            { 
                id: (++id).toString(),
                label: 'Clientes',
                routerLink: 'clientes',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                }
            },
            { 
                id: (++id).toString(),
                label: 'Produtos',
                routerLink: 'produtos',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                }
               
            },
            { 
                id: (++id).toString(),
                label: 'Carteira Setup',
                routerLink: 'setup',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                }
            },
            { 
                id: (++id).toString(),
                label: 'Percentual de Risco',
                routerLink: 'percentual-risco',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
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

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        this.empresaService.create(this.objeto);
        this.voltar();
        this.toastr.success('Operação concluída');
        this.loading = false;
    }

    
    chan() {
      this.index += 1;
    }

}
