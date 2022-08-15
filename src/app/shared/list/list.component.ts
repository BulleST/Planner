import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    faFilter = faFilter;
    faTimes = faTimes;
    faEllipsisV = faEllipsisV;

    @Input() list: any[] = [];
    @Input() loading = false;
    @Input() filterLink = true;
    @Input() filterTable = true;
    @Input() paginator = true;
    @Input() sortTable = true;
    @Input() menuTable = true;
    @Input() columns = [
        { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
        { field: 'nome', header: 'Nome', filterType: 'text', filterDisplay: 'menu' },
        { field: 'email', header: 'E-mail', filterType: 'text', filterDisplay: 'menu' },
        { field: 'perfil', header: 'Tipo de Acesso', filterType: 'text', filterDisplay: 'menu' },
    ];
    @Input() selected?: any;
    @Input() itemsSelected: any[] = [];

    filters: string[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private table: Table) 
        {
        this.filters = this.columns.map(x => x.field);
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
