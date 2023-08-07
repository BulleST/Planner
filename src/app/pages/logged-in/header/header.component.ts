import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { faIdCard, faKey, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Header } from 'src/app/utils/header';
import { ModoEscuro } from 'src/app/utils/modo-escuro';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { Role } from 'src/app/models/account-perfil.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, AfterViewInit {
    Role = Role;
    faSignOut = faSignOut;
    faIdCard = faIdCard;
    faKey = faKey;
    faUser = faUser;
    modoEscuroAtivado = false;
    menuHeaderOpen = false;
    userLogado?: Account;
    nomeAbreviado = '';
    perfil = '';
    subscription: Subscription[] = [];

    constructor(
        private modoEscuro: ModoEscuro,
        private accountService: AccountService,
        private header: Header,
    ) {
        var getAtivado = this.modoEscuro.getAtivado().subscribe(res => this.modoEscuroAtivado = res);
        
        this.userLogado = this.accountService.accountValue;
        var account = this.accountService.account.subscribe(async res => {
            this.userLogado = res;
            if (res) {
                this.perfil = Role[res.perfilAcesso_Id]
                let array = res?.name.split(' ')
                if (array.length == 1) {
                    this.nomeAbreviado = array[0];
                } else {
                    this.nomeAbreviado = array[0] + ' ' + array[array.length - 1];
                }
            }
        });
        this.subscription.push(getAtivado);
        this.subscription.push(account);

        var menuHeaderOpen = this.header.menuHeaderOpen.subscribe(res => this.menuHeaderOpen = res);
        this.subscription.push(menuHeaderOpen);
    }

ngAfterViewInit(): void {
    this.header.clickOut();
}
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }


    toggleMenuHeader(): void {
        // this.menuHeaderOpen = !this.menuHeaderOpen;
        this.header.toggleMenuHeader();
    }

    sair() {
        this.accountService.logout();
    }


}