import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faFileCircleCheck, faPercent } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { setupColumns } from 'src/app/models/carteiraSetup-produto.model';
import { Empresa } from 'src/app/models/empresa.model';
import { percentualRiscoColumns } from 'src/app/models/percentual-risco.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-percentual-risco',
    templateUrl: './percentual-risco.component.html',
    styleUrls: ['./percentual-risco.component.css']
})
export class PercentualRiscoComponent implements OnInit {
    faPercent = faPercent;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    objeto: Empresa = new Empresa;
    percentualRiscoColumns = percentualRiscoColumns;
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
        this.router.navigate(['empresas', 'cadastrar', 'finalizar'])
    }
    
    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'setup'])
    }

}
