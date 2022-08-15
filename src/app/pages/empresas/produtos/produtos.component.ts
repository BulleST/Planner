import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCity, faEllipsisV, faFilter, faHandHoldingDollar, faTimes, faUsers, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    faHandHoldingDollar = faHandHoldingDollar;
    faFilter = faFilter;
    loading = false;

    produtoSelected?: Produto;
    produtosSelected: Produto[] = [];
    produtosColumn = [
        { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
        { field: 'nome', header: 'Razão Social', filterType: 'text', filterDisplay: 'menu' },
        { field: 'cpf', header: 'CPF', filterType: 'text', filterDisplay: 'menu' },
    ];
    produtosFilters: string[] = [];
    objeto: Empresa = new Empresa;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private table: Table) { 
        this.produtosFilters = this.produtosColumn.map(x => x.field);
    }

    ngOnInit(): void {
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

}
