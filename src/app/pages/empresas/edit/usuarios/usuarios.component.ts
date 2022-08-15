import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCity, faEllipsisV, faFilter, faTimes, faUsers, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    faCity = faCity;
    faUsers = faUsersRectangle;
    faFilter = faFilter;
    loading = false;

    usuarioSelected?: Usuario;
    usuariosSelected: Usuario[] = [];
    usuariosColumn = [
        { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
        { field: 'nome', header: 'Razão Social', filterType: 'text', filterDisplay: 'menu' },
        { field: 'cpf', header: 'CPF', filterType: 'text', filterDisplay: 'menu' },
    ];
    usuariosFilters: string[] = [];
    objeto: Empresa = new Empresa;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private table: Table) { 
        this.usuariosFilters = this.usuariosColumn.map(x => x.field);
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
