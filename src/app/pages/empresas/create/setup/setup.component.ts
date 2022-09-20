import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faEllipsisV, faFilter, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Column} from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { CarteiraProdutoRel, setupRelColumns } from 'src/app/models/carteira-produto-rel';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-setup-create',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
    faWallet = faWallet;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    faFilter = faFilter;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;

    objeto: Empresa = new Empresa;
    setupColumns: Column[] = setupRelColumns;
    tableLinks: MenuTableLink[] = [];
    loading = false;
    selected?: any;
    selectedItems: any[] = [];
    filters: string[] = [];
    list: any[] = [];

    rels: CarteiraProdutoRel[] = []
    
    constructor(
        private empresaService: EmpresaService,
        private router: Router,
        private table: Table,
        public crypto: Crypto,
        private currency: CurrencyPipe,
    ) {
       
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
            this.rels = []
            this.objeto.carteiraSetup.map(carteiraSetup => {
                carteiraSetup.carteiraProdutoRel.map(rel => {
                        var obj: CarteiraProdutoRel = {
                            id: rel.id,
                            carteiraSetup_Id: carteiraSetup.id,
                            carteiraSetup: carteiraSetup,
                            percentual: rel.percentual,
                            produtoTributacao_Id: rel.produtoTributacaoRel.id,
                            produtoTributacaoRel: rel.produtoTributacaoRel,
                            // produto: rel.produtoTributacaoRel.produto,
                            // produto_Id: rel.produtoTributacaoRel.produto_Id,
                            // tributacao: rel.produtoTributacaoRel.tributacao,
                            // tributacao_Id: rel.produtoTributacaoRel.tributacao_Id,
                            // aliquota: rel.produtoTributacaoRel.tributacao.aliquota,
                        };
                        this.rels.push(obj)
                    return rel;
                });
                this.rels.sort((x, y) => x.carteiraSetup_Id - y.carteiraSetup_Id)
                return carteiraSetup;
            })
        });
        this.filters = this.setupColumns.map(x => x.field);

        this.table.loading.subscribe(res => {
            this.loading = res
        });
        this.table.selected.subscribe(res => this.selected = res);
        this.table.selectedItems.subscribe(res => this.selectedItems = res);
        
        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['carteiraSetup_Id', 'id'] },
            { label: 'Excluir', routePath: [ 'excluir-rel'], paramsFieldName: ['carteiraSetup_Id', 'id'] },
        ];
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['empresas', 'cadastrar', 'percentual-risco'])
    }

    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'produtos'])
    }


}
