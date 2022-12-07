import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

    loading = false;
    erro = '';
    mensagemSucesso = '';
    faChevronCircleLeft = faChevronCircleLeft;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private toastrService: ToastrService,
        private table: Table
    ) { 
        // this.table.loading.next(true);
        console.log('oi')
        const token = this.activatedRoute.snapshot.queryParams['token'];
        this.router.navigate([], { relativeTo: this.activatedRoute, replaceUrl: true });
        this.accountService.verifyEmail(token)
            .subscribe({
                next: (res) => {
                    console.log(res)
                    this.loading = false;
                    this.erro = '';
                    this.mensagemSucesso = res['message'];
                },
                error: (res) => {
                    console.error(res)
                    this.erro = res.error.message;
                    this.mensagemSucesso = '';
                    this.loading = false;
                }
            });

    }

    ngOnInit(): void {
    }

}
