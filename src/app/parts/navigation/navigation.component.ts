import { Component, OnInit } from '@angular/core';
import { faCity, faHandHoldingDollar, faPercent, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { Header } from 'src/app/utils/header';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    faHandHoldingDollar = faHandHoldingDollar;
    faUsers = faUsers;
    faPercent = faPercent;
    faCity = faCity;
    menuOpen: boolean = false;
    account?: Account;
    constructor(
        private header: Header,
        private accountService: AccountService
    ) { 
        this.menuOpen = this.header.aside;
        this.header.open.subscribe(res => this.menuOpen = res);
        this.accountService.account.subscribe(async res => {
            this.account = res;
            if (res && res.role == 'Admin') {

            }
        });

    }

    ngOnInit(): void {
    }


    toggleAside() {
        this.header.toggleMenuAside();
    }

}
