import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./../account.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    faChevron = faChevronCircleLeft;
    loading = false;
    erro = '';
    object = {
        email: '',
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        ) { }

    ngOnInit(): void {
    }


    send() {
        this.accountService.forgotPassword(this.object.email)
        .subscribe({
            next: (res) => {
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
