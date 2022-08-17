import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { setupColumns } from 'src/app/models/carteiraSetup-produto.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
    faWallet = faWallet;
    objeto: Empresa = new Empresa;
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

    next() {
        this.router.navigate(['empresas', 'cadastrar', 'finalizar'])
    }

    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'produtos'])
    }

}
