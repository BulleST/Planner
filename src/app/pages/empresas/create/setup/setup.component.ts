import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faEllipsisV, faFilter, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { CarteiraProdutoRel, setupColumns } from 'src/app/models/carteiraSetup-produto.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
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
    setupColumns = setupColumns;
    loading = false;
    selected?: any;
    selectedItems: any[] = [];
    filters: string[] = [];
    rels: CarteiraProdutoRel[] = [];
    setup: CarteiraSetup[] = [];
    
    constructor(
        private empresaService: EmpresaService,
        private router: Router,
        private table: Table,
        public crypto: Crypto,
        private currency: CurrencyPipe,
    ) {
       
        this.empresaService.empresa.subscribe(res => {
            this.objeto = res ?? new Empresa;
            this.objeto.carteiraSetup.map(item => {
                item.carteiraProdutoRel.map(rel => {
                    // rel.percentual = this.currency.transform(rel.percentual, 'BRL', '', '1.2') + '%' as unknown as number;
                    rel.carteiraSetup = item;
                    return rel
                })
                return item;
            })
            var arrays = this.objeto.carteiraSetup.map(x => x.carteiraProdutoRel)
            this.rels = [].concat.apply([], arrays as unknown as ConcatArray<never>[]);

            this.setup = this.objeto.carteiraSetup;
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
        this.router.navigate(['empresas', 'cadastrar', 'percentual-risco'])
    }

    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'produtos'])
    }


}
