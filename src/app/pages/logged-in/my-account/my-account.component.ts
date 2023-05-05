import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { LoadingService } from 'src/app/parts/loading/loading';
import { AccountService } from 'src/app/services/account.service';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnDestroy {
    modalOpen = false;
    faKey = faKey;
    objeto?: Account;
    loading = false;
    mensagemErro = '';
    erro: string[] = [];
    subscription: Subscription[] = [];

    constructor(
        private router: Router,
        private modal: ModalOpen,
        private toastr: ToastrService,
        private loadingUtils: LoadingService,
        private accountService: AccountService,

    ) {
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        var account = this.accountService.account.subscribe(res => this.objeto = res);
        this.subscription.push(account);

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }
    
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.setOpen(false);
        setTimeout(() => {
            this.router.navigate(['..']);
        }, 200);
    }

    create(form: NgForm) {
        this.erro = [];
        this.loading = true;
        this.loadingUtils.loading.next(true);
        if (form.invalid) {
            this.erro.push('Formulário inválido');
            this.toastr.error('Formulário inválido');
            return;
        }

        setTimeout(() => {
            this.loading = false;
            this.loadingUtils.loading.next(false);
        }, 300);
    }
}
