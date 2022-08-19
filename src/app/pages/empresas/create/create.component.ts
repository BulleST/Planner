import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCity, faCreditCardAlt, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
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
export class CreateComponent implements OnInit {

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
        if ( this.empresaService.objeto.value == undefined)
            this.empresaService.setObject(new Empresa);
            
        this.empresaService.objeto.subscribe(res => {
            this.objeto = res ?? new Empresa;
        });

        this.items =  [
            { 
                id: '1',
                label: 'Dados Cadastrais',
                routerLink: 'dados-cadastrais',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                },
                icon: faCreditCardAlt.toString()
            },
            { 
                id: '2',
                label: 'Usuários',
                routerLink: 'usuarios',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                }
            },
            { 
                id: '3',
                label: 'Produtos',
                routerLink: 'produtos',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                }
               
            },
            { 
                id: '4',
                label: 'Carteira Setup',
                routerLink: 'setup',
                command: (event: any) => {
                    this.table.selected.next(undefined);
                    this.table.selectedItems.next([]);
                }
            },
            { 
                id: '5',
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
