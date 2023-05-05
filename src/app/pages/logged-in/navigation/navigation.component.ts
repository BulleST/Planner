import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCity, faHandHoldingDollar, faIdCard, faPercent, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { Header } from 'src/app/utils/header';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {
    Role = Role;
    faHandHoldingDollar = faHandHoldingDollar;
    faUsers = faUsers;
    faPercent = faPercent;
    faCity = faCity;
    faIdCard = faIdCard;
    menuOpen: boolean = false;
    account?: Account;
    subscription: Subscription[] = [];

    constructor(
        private header: Header,
        private accountService: AccountService
    ) { 
        this.menuOpen = this.header.aside;

        var open = this.header.open.subscribe(res => this.menuOpen = res);
        this.subscription.push(open);   
        
        var account = this.accountService.account.subscribe(res => this.account = res);
        this.subscription.push(account);   
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    toggleAside() {
        this.header.toggleMenuAside();
    }

}
