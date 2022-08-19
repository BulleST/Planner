import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faEllipsisV, faFilter, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { setupColumns } from 'src/app/models/carteiraSetup-produto.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-setup',
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
    setupColumns = setupColumns;
    loading = false;
    selected?: any;
    selectedItems: any[] = [];
    filters: string[] = [];
    
    constructor(
        private empresaService: EmpresaService,
        private router: Router,
        private table: Table,
        public crypto: Crypto,
    ) {
        this.empresaService.objeto.subscribe(res => {
            this.objeto = res ?? new Empresa;
        });
        this.filters = this.setupColumns.map(x => x.field);

        this.table.loading.subscribe(res => {
            this.loading = res
        });
        this.table.selected.subscribe(res => this.selected = res);
        this.table.selectedItems.subscribe(res => this.selectedItems = res);
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['empresas', 'cadastrar', 'finalizar'])
    }

    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'produtos'])
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

    getCellData(row: any, col: any): any {
        const nestedProperties: string[] = col.field.split('.');
        let value: any = row;
        for (const prop of nestedProperties) {
            value = value[prop];
        }

        return value;
    }

}
