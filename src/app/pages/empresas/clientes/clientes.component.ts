import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCity, faEllipsisV, faFilter, faPeopleRoof, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faUsers = faUsers;
    faFilter = faFilter;
    faTimes = faTimes;
    loading = false;

    clienteSelected?: Cliente;
    clientesSelected: Cliente[] = [];
    clientesColumn = [
        { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
        { field: 'nome', header: 'Razão Social', filterType: 'text', filterDisplay: 'menu' },
        { field: 'cpf', header: 'CPF', filterType: 'text', filterDisplay: 'menu' },
    ];
    clientesFilters: string[] = [];
    objeto: Empresa = new Empresa;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private table: Table) { 
        this.clientesFilters = this.clientesColumn.map(x => x.field);
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
