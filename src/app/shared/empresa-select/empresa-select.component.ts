import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { Empresa } from 'src/app/models/empresa.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-empresa-select',
    templateUrl: './empresa-select.component.html',
    styleUrls: ['./empresa-select.component.css'],
    
})
export class EmpresaSelectComponent implements OnInit {
    empresaSelected = new Empresa;
    empresaSelectedId = 0;
    empresas: Empresa[] = [];
    loading = false;
    account?: Account;
    Role = Role;

    constructor(
        private empresaService: EmpresaService,
        private accountService: AccountService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.empresaService.empresa.subscribe(res => {
            this.empresaSelected = res;
            this.empresaSelectedId = res.id;
        })

        this.accountService.account.subscribe(async res => {
            this.account = res;
            if (res && res.role && (this.empresaSelected == undefined || this.empresaSelectedId == 0)) {
                if (res.role == Role.Admin) {
                    this.empresas = await lastValueFrom(this.empresaService.getList());
                    if (this.empresaSelected.id == 0) {
                        this.empresaService.setObject(res.empresa ?? new Empresa, 'empresaSelected 1');
                    }
                } 
            }
        })
    }

    ngOnInit(): void {
    }

    empresaChange() {
        var empresa = this.empresas.find(x => x.id == this.empresaSelectedId);
        this.empresaService.setObject(empresa ?? new Empresa, 'empresaChange');
    }

}
