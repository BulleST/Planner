import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/models/account.model';
import { Loading } from 'src/app/utils/loading';
import { AccountService } from 'src/app/services/account.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/parts/alert/alert.service';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./../account.component.css', './create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
    faChevronCircleLeft = faChevronCircleLeft;
    objeto = new Register;
    loading: boolean = false;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private loadingHelper: Loading,
        private accountService: AccountService,
        private alertService: AlertService,
    ) { 
        this.loadingHelper.loading.subscribe(res => this.loading = res);
    }

    ngOnInit(): void {
    }

    cadastrar(form: NgForm) {
        this.loadingHelper.loading.next(true);
        this.objeto.telefoneCelular = parseInt(this.objeto.telefoneCelular.toString());
        this.objeto.acceptTerms = true;
        this.accountService.register(this.objeto).subscribe({
            next: res => {
                this.router.navigate(['account', 'login']);
                this.toastr.success('Operação concluida com sucesso!')
                this.alertService.success('Um link de verificação de conta foi enviado para o email cadastrado. Siga as instruções para completar o cadastro.');
                this.loadingHelper.loading.next(false);
            }, 
            error: err => {
                this.loadingHelper.loading.next(false);
            }
        })
    }

}
