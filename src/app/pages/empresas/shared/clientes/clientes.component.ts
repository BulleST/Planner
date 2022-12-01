import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faCity, faEllipsisV, faFilter, faPeopleRoof, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Cliente, clienteColumns } from 'src/app/models/cliente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faUsers = faUsers;
    faFilter = faFilter;
    faTimes = faTimes;
    loading = false;

    clientesColumn = clienteColumns;

    objeto: Empresa = new Empresa;
    tableLinks: MenuTableLink[] = [];

    constructor(
        private empresaService: EmpresaService,
        private mask: MaskApplierService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
        });

        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
            { label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] },
        ];
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['..', 'produtos'], { relativeTo: this.activatedRoute })
    }
    
    previous() {
        this.router.navigate(['..', 'usuarios'], { relativeTo: this.activatedRoute })
    }


}
