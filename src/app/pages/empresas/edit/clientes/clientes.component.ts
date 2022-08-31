import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCity, faEllipsisV, faFilter, faPeopleRoof, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.model';
import { Empresa, EmpresaCreateRequest } from 'src/app/models/empresa.model';
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

    clientesColumn = [
        { field: 'id', header: 'Id', filterType: 'text', filterDisplay: 'menu' },
        { field: 'nome', header: 'Razão Social', filterType: 'text', filterDisplay: 'menu' },
        { field: 'cpf', header: 'CPF', filterType: 'text', filterDisplay: 'menu' },
    ];
    objeto: Empresa = new Empresa;

    constructor(
        private empresaService: EmpresaService,
        private mask: MaskApplierService
    ) {
        // this.empresaService.createEmpresaObject.subscribe(res => {
        //     this.objeto = res ?? new EmpresaCreateRequest;
        //     // this.objeto.cliente.map(item => {
        //     //     item.cpf = this.mask.applyMask(item.cpf.toString(), '000.000.000-00') as unknown as number;
        //     //     return item;
        //     // });
        // });
    }

    ngOnInit(): void {
    }

}
