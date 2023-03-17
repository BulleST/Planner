import { Component, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Empresa } from 'src/app/models/empresa.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-empresa-select',
    templateUrl: './empresa-select.component.html',
    styleUrls: ['./empresa-select.component.css']
})
export class EmpresaSelectComponent implements OnInit, OnDestroy {

    empresaSelected: Empresa = new Empresa;
    empresas: Empresa[] = [];
    loading = false;
    accountLogged?: Account;
    Role = Role;

    constructor(
        private empresaService: EmpresaService,
        private accountService: AccountService
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.empresaSelected = res;
        })

        this.accountService.account.subscribe(async res => {
            this.accountLogged = res;
            console.log('account : ', res)
            if (res && res.role) {
                if (res.role == Role.Admin) {
                    this.empresas = await lastValueFrom(this.empresaService.list);
                    this.empresaService.setObject(this.empresas[0] ?? new Empresa);
                } else if (res.role == Role.Master || res.role == Role.Backoffice) {
                    let empresa = res.empresa ?? await lastValueFrom(this.empresaService.get(res.empresa_Id))
                    if (res.empresa)
                        this.empresaService.setObject(empresa);
                } 
            }
        })
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        
    }

    empresaChange() {
        this.empresaService.setObject(this.empresaSelected);
    }

}
