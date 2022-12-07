import { Component, OnInit } from '@angular/core';
import { faCreditCard, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/models/empresa.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-minha-empresa',
    templateUrl: './minha-empresa.component.html',
    styleUrls: ['./minha-empresa.component.css']
})
export class MinhaEmpresaComponent implements OnInit {
    faIdCard = faIdCard;
    empresa?: Empresa;

    constructor(
        private accountService: AccountService,
    ) { 
        this.empresa = this.accountService.accountValue?.empresa;

    }

    ngOnInit(): void {
    }

}
