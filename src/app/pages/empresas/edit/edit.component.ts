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

        activatedRoute.params.subscribe(p => {
            if (p['empresa_id']) {
                this.objeto.id = this.crypto.decrypt(p['empresa_id']);
                this.empresaService.get(this.objeto.id).subscribe({
                    next: res => {
                        this.objeto = res;
                        this.empresaService.empresaSelected.next(res);
                        this.empresaService.empresaObject.next(res);
                        console.log(res)              
                    }, 
                    error: err => {

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

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        this.empresaService.create(this.objeto);
        this.voltar();
        this.toastr.success('Operação concluída');
        this.loading = false;
    }

}
