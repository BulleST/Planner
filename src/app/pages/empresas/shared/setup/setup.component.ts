import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faEllipsisV, faFilter, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Column} from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { CarteiraProdutoRel, setupRelColumns } from 'src/app/models/carteira-produto-rel';
import { setupColumns } from 'src/app/models/carteiraSetup.model';
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
    setupColumns: Column[] = setupColumns;
    tableLinks: MenuTableLink[] = [];
    loading = false;
    selected?: any;
    selectedItems: any[] = [];
    filters: string[] = [];

    
    constructor(
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private table: Table,
        public crypto: Crypto,
        private currency: CurrencyPipe,
    ) {
       
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
            this.objeto.carteiraSetup = this.objeto.carteiraSetup.map(x => {
                x.ativo = x.dataDesativado != undefined ? false : true;
                return x
            })
        });
        this.filters = this.setupColumns.map(x => x.field);
        
        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
            { label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] },
        ]

        this.table.loading.subscribe(res => this.loading = res);
        this.table.selected.subscribe(res => {
            this.selected = res;
            if (res) {
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.table.selectedItems.subscribe(res => this.selectedItems = res);
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['..', 'percentual-risco'], { relativeTo: this.activatedRoute })
    }

    previous() {
        this.router.navigate(['..', 'produtos'], { relativeTo: this.activatedRoute })
    }

    onRowSelect(event: any) {
        this.table.onRowSelect(event);
    }

    onRowUnselect(event: any) {
        this.table.onRowUnselect(event)
    }

    onAllRowToggle(event: any) {
        this.table.onAllRowToggle(event);
    }

    getCellData(row: any, col: Column): any {
        return this.table.getCellData(row, col);
    }


}
