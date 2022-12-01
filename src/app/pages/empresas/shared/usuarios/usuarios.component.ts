import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Empresa } from 'src/app/models/empresa.model';
import { userColumns } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-usuarios-create',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    faUser = faUsers;
    objeto: Empresa = new Empresa;
    userColumns = userColumns;
    tableLinks: MenuTableLink[] = [];
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    constructor(
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
        });
        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
            { label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] },
        ]
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['..', 'clientes'], { relativeTo: this.activatedRoute })
    }
    
    previous() {
        this.router.navigate(['..', 'dados-cadastrais'], { relativeTo: this.activatedRoute })
    }

}
