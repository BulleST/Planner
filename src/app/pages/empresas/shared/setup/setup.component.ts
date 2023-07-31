import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faCheck, faEllipsisV, faFilter, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { CarteiraSetup, setupColumns } from 'src/app/models/carteiraSetup.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';
import { Table } from 'src/app/utils/table';
import { MenuItems } from '../menu-items/menu-items';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-setup-create',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnDestroy {
    faWallet = faWallet;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    faFilter = faFilter;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;
    faCheck = faCheck;

    objeto: Empresa = new Empresa;
    columns = setupColumns;
    tableLinks: MenuTableLink[] = [];
    isEditPage = false;
    url = '';
    loading = false;
    subscription: Subscription[] = [];

    constructor(
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private table: Table,
        public crypto: Crypto,
        public menuItems: MenuItems,
        private toastr: ToastrService,
        private setupService: CarteiraSetupService,
        private modal: ModalOpen,
    ) {
       
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/editar')) {
            this.isEditPage = true;
        } else {
            this.isEditPage = false;
            this.columns = this.columns.filter(x => x.field != 'ativo');
        }

        var empresa = this.empresaService.empresa.subscribe(res => this.objeto = res);
        this.subscription.push(empresa);   

        var loading = this.table.loading.subscribe(res => this.loading = res);
        this.subscription.push(loading);   
        var selected = this.table.selected.subscribe(res => {
            this.tableLinks = [];
            if (res) { // se tiver linha selecionada
                this.tableLinks.push({ label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] });
                if (!res.registroNaoSalvo) {
                    this.tableLinks.push({ label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] });
                } else {
                    this.tableLinks.push({ label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] })
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    next() {
        this.menuItems.erro = [];
        if (!this.objeto.nome.trim() || !this.objeto.cnpj.toString().trim() || !this.objeto.cnpj ||!this.objeto.email.trim()) {
            this.menuItems.erro.push('Dados cadastrais inválidos.');
            this.toastr.error('Dados cadastrais inválidos.');
            return;
        }
        let obj = Object.assign({}, JSON.parse(JSON.stringify(this.objeto))) as Empresa; 
        obj.produto = obj.produto.map(x => {
            delete x.empresa;
            if (x.registroNaoSalvo) {
                x.id = 0; // removendo o id adicionado pelo front daqueles que não foram salvos no db
            }
            return x
        });

        obj.carteiraSetup.map(x => {
            if (x.registroNaoSalvo) {
                x.id = 0; // removendo o id adicionado pelo front daqueles que não foram salvos no db
            }
            x.carteiraProdutoRel.map(rel => {
                if (x.registroNaoSalvo) {
                    // removendo o id adicionado pelo front daqueles que não foram salvos no db
                    rel.carteiraSetup_Id = 0; 
                }
                return rel
            })
            return x;
        });

        obj.cliente.filter(x => x.registroNaoSalvo).map(x => {
            delete x.empresa;
            if (x.registroNaoSalvo) {
                x.id = 0; // removendo o id adicionado pelo front daqueles que não foram salvos no db
            }
            return x;
        });
        obj.account.filter(x => x.registroNaoSalvo).map(x => {
            if (x.registroNaoSalvo) {
                x.id = 0; // removendo o id adicionado pelo front daqueles que não foram salvos no db
            }
            return x;
        });

        if (this.url.includes('empresas/cadastrar')) {
            lastValueFrom(this.empresaService.create(obj))
            .then(res => {
                lastValueFrom(this.empresaService.getList());
                this.modal.voltar();
            })
            .catch(res => this.menuItems.erro.push(getError(res)))
        }
        else if (this.url.includes('empresas/editar')) { // Enviar para a API
            lastValueFrom(this.empresaService.edit(obj))
            .then(res => {
                lastValueFrom(this.empresaService.getList());
                this.modal.voltar();
            })
            .catch(res => this.menuItems.erro.push(getError(res)))
        }
    }
    
    previous() {
        this.router.navigate(['..', 'produtos'], { relativeTo: this.activatedRoute })
    }

    create = (setupService: CarteiraSetupService = this.setupService): void => {
        setupService.setObject(new CarteiraSetup);
    }
}
