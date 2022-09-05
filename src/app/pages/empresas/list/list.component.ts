import { Component, OnInit } from '@angular/core';
import { faCity, faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { Empresa, empresaColumns } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';
import * as $ from 'jquery';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  faFilter = faFilter;
  faEllipsisV = faEllipsisV;
  faCity = faCity;
  faTimes = faTimes;

  list: Empresa[] = [];
  selected?: Empresa;
  selectedItems: Empresa[] = [];
  loading = true;
  columns = empresaColumns;
  filters: string[] = [];
  tableLinks: MenuTableLink[] = []
  
  constructor(
    private table: Table,
    private empresaService: EmpresaService,
    public crypto: Crypto,
    private mask: MaskApplierService,
  ) {
    this.filters = this.columns.map(x => x.field);
    this.table.loading.subscribe(res => this.loading = res);
    this.table.selected.subscribe(res => this.selected = res);
    this.table.selectedItems.subscribe(res => this.selectedItems = res);
    this.empresaService.getList().subscribe(res => {
      this.list = res;
      this.list.map(item => {
        item.cnpj = this.mask.applyMask(item.cnpj.toString().padStart(14, '0'), '00.000.000/0000-00') as unknown as number;
        return item;
      });
      this.loading = false;
    });

    this.tableLinks = [
        { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
        { label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] },
    ]
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
