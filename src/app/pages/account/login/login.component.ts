import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { Loading } from 'src/app/utils/loading';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./../account.component.css']
})
export class LoginComponent implements OnInit {
    login = new Login;
    loading: boolean = false;
    err = '';

    constructor(
        private accountService: AccountService,
        private loadingHelper: Loading,
        private router: Router
    ) { 
        this.loadingHelper.loading.subscribe(res => this.loading = res);
        // this.accountService.isLogged().subscribe({
        //     next: (res) => {
        //         this.router.navigate(['']);
        //     },
        //     error: (res) => {
        //         console.error(res)
        //         // this.accountService.setAccount(undefined);

        //     }
        // })
    }

    ngOnInit(): void {
    }

    logar() {
        this.loadingHelper.loading.next(true);
        this.accountService.login(this.login).subscribe({
            next: res => {
            }, 
            error: err => {
                this.err = err.error.message
            }
        });
    }

}
