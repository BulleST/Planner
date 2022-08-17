import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { setupColumns } from 'src/app/models/carteiraSetup-produto.model';
import { Empresa } from 'src/app/models/empresa.model';
import { produtoColumns } from 'src/app/models/produto.model';
import { userColumns } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-finalizar',
    templateUrl: './finalizar.component.html',
    styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

    faFileCircleCheck = faFileCircleCheck
    objeto: Empresa = new Empresa;
    userColumns = userColumns;
    produtoColumns = produtoColumns;
    setupColumns = setupColumns;
    constructor(
        private empresaService: EmpresaService,
        private router: Router
    ) {
        this.empresaService.objeto.subscribe(res => {
            this.objeto = res ?? new Empresa;
        });
    }

    ngOnInit(): void {
    }

    salvar() {
        
    }

    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'setup'])
    }

}
