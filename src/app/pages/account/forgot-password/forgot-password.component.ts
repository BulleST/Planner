import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./../account.component.css']
})
export class ForgotPasswordComponent {

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



    send() {
        lastValueFrom(this.accountService.forgotPassword(this.object.email))
        .then(res => {
            this.loading = false;
            this.erro = '';
            this.alertService.success(res['message']);
            this.router.navigate(['account', 'login']);
        })
        .catch(res => {
            this.erro = getError(res);
            this.loading = false;
        });
    }

}
