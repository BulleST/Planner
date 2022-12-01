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
    }

    ngOnInit(): void {
        this.login.email = 'calmeida.no@gmail.com'
        this.login.password = 'cadomeew'
        // this.logar()
    }

    logar() {
        this.loadingHelper.loading.next(true);
        this.accountService.login(this.login).subscribe({
            next: res => {
                console.log(res)
            }, 
            error: err => {
                console.log(err)
                this.err = err.error.message
            }
        });
    }

}
