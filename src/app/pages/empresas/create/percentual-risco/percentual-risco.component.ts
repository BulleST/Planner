import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { setupColumns } from 'src/app/models/carteiraSetup-produto.model';
import { Empresa } from 'src/app/models/empresa.model';
import { produtoColumns } from 'src/app/models/produto.model';
import { userColumns } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-percentual-risco',
    templateUrl: './percentual-risco.component.html',
    styleUrls: ['./percentual-risco.component.css']
})
export class PercentualRiscoComponent implements OnInit {

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
}
