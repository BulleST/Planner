import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa, EmpresaCreateRequest } from 'src/app/models/empresa.model';
import { userColumns } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-usuarios-create',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    faUser = faUsers;
    objeto: EmpresaCreateRequest = new EmpresaCreateRequest;
    userColumns = userColumns;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    constructor(
        private empresaService: EmpresaService,
        private router: Router
    ) {
        this.empresaService.createEmpresaObject.subscribe(res => {
            this.objeto = res ?? new EmpresaCreateRequest;
        });
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['empresas', 'cadastrar', 'produtos'])
    }
    
    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'dados-cadastrais'])
    }

}
