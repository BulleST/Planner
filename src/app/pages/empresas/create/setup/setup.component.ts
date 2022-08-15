import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { produtoColumns } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
    faHandHoldingDollar = faHandHoldingDollar;
    objeto: Empresa = new Empresa;
    produtoColumns = produtoColumns;
    
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router
    ) {
        this.empresaService.objeto.subscribe(res => {
            this.objeto = res ?? new Empresa;
        });
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['empresas', 'cadastrar', 'carteira-setup'])
    }

    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'produtos'])
    }

}
