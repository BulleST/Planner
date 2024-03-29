import { Component, OnInit } from '@angular/core';
import { faCreditCard, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/models/empresa.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-minha-empresa',
    templateUrl: './minha-empresa.component.html',
    styleUrls: ['./minha-empresa.component.css']
})
export class MinhaEmpresaComponent {
    faIdCard = faIdCard;
    empresa: Empresa = new Empresa;
    cnpj = '';

    constructor(
        private accountService: AccountService,
        private empresaService: EmpresaService
    ) {
        this.empresa = this.accountService.accountValue?.empresa ?? new Empresa;
        lastValueFrom(this.empresaService.get(this.empresa.id))
            .then(res => {
                this.empresa = res;
                this.cnpj = this.empresa.cnpj.toString().padStart(14, '0')
            });
    }
}
