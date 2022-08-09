import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { Empresa } from 'src/app/models/empresa.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';
import * as $ from 'jquery';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  faFilter = faFilter;
  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  list: any[] = [];
  selected?: Empresa;
  selectedItems: Empresa[] = [];
  loading = false;
  columns = [
    { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
    { field: 'nome', header: 'Razão Social', filterType: 'text', filterDisplay: 'menu' },
    { field: 'cnpj', header: 'CNPJ', filterType: 'text', filterDisplay: 'menu' },
    { field: 'email', header: 'E-mail', filterType: 'text', filterDisplay: 'menu' },
  ]
  filters: string[] = [];

  
  constructor(
    private table: Table,
    private empresaService: EmpresaService,
    public crypto: Crypto,
    private mask: MaskApplierService
  ) {
    this.filters = this.columns.map(x => x.field);
    this.table.loading.subscribe(res => this.loading = res);
    this.table.selected.subscribe(res => this.selected = res);
    this.table.selectedItems.subscribe(res => this.selectedItems = res);
    this.empresaService.getList().subscribe(res => {
      this.list = res;
      this.list.map(item => {
        item.cnpj = this.mask.applyMask(item.cnpj.toString().padStart(14, '0'), '00.000.000/0000-00');
        return item;
      });
    });
    // this.empresaService.teste();
  }

  ngOnInit(): void {
  }

  onRowSelect(event: any) {
    this.table.onRowSelect(event);
  }

  onRowUnselect(event: any) {
    this.table.onRowUnselect(event)
  }

  teste(event: any) {
    this.table.onAllRowToggle(event);
  }
}
