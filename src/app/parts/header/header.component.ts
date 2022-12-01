import { Component, OnInit } from '@angular/core';
import { faIdCard, faKey, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Header } from 'src/app/utils/header';
import { ModoEscuro } from 'src/app/utils/modo-escuro';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    faSignOut = faSignOut;
    faIdCard = faIdCard;
    faKey = faKey;
    modoEscuroAtivado = false;
    userLogadoOpen = false;
    userLogado?: Account;
    nomeAbreviado = '';
    showEmpresas = false;
    empresas: Empresa[] = [];
    empresaSelected?: Empresa;
    empresaSelectedId?: number;

    constructor(
        private modoEscuro: ModoEscuro,
        private accountService: AccountService,
        private header: Header,
        private empresaService: EmpresaService,
    ) {
        this.modoEscuro.getAtivado().subscribe(res => this.modoEscuroAtivado = res);
        this.header.menuHeaderOpen.subscribe(res => this.userLogadoOpen = res);
        this.empresaService.empresaSelected.subscribe(res => {
            this.empresaSelected = res;
            this.empresaSelectedId = res?.id;
        })
        this.accountService.account.subscribe(async res => {
            this.userLogado = res;
            if (res) {
                if (res?.role == 'Admin') {
                    this.showEmpresas = true;
                    this.empresas = await lastValueFrom(this.empresaService.getList());
                } else {
                    this.showEmpresas = false;
                    this.empresas = [];
                }
                let array = res?.name.split(' ')
                if (array.length == 1) {
                    this.nomeAbreviado = array[0];
                } else {
                    this.nomeAbreviado = array[0] + ' ' + array[array.length - 1];
                }
            }
        })
    }

    ngOnInit(): void {
    }

    toggleMenuHeader(): void {
        this.header.toggleMenuHeader();
    }

    sair() {
        this.accountService.logout();
    }

    empresaChange() {
        if (this.empresaSelectedId) {
            this.empresaSelected = this.empresas.find(x => x.id == this.empresaSelectedId);
        } else {
            this.empresaSelected = undefined;
        }
        this.empresaService.empresaSelected.next(this.empresaSelected);
    }

}
