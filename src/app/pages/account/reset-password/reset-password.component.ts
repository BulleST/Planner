import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ResetPassword } from 'src/app/models/account.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./../account.component.css']
})
export class ResetPasswordComponent implements OnInit {
    faChevronCircleLeft = faChevronCircleLeft;
    objeto: ResetPassword = new ResetPassword;
    loading = false;
    erro = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
    ) {
        this.objeto.token = this.activatedRoute.snapshot.queryParams['token'];
        if (this.objeto.token == '' || this.objeto.token == undefined) {
            this.router.navigate(['account', 'error']);
        }
    }

    ngOnInit(): void {
    }

    send() {
        this.accountService.resetPassword(this.objeto)
        .subscribe({
            next: (res) => {
                console.log(res)
                this.loading = false;
                this.erro = '';
                this.alertService.success(res['message']);
            },
            error: (res) => {
                console.error(res)
                this.erro = res.error.message;
                this.loading = false;
            }
        });
    }
}
