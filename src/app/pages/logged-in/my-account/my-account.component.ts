import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Loading } from 'src/app/utils/loading';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
	modalOpen = false;
  faKey = faKey;
	objeto = {
    nome: '',
    email: '',
    celular: '',
  };

  loading = false;
  mensagemErro = '';
  erro: string[] = [];

	constructor(
		private router: Router,
    private modal: ModalOpen,
    private toastr: ToastrService,
    private _loading: Loading,
    
	) {
		this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
   }

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
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
    this._loading.loading.next(true);
    if (form.invalid) {
      this.erro.push('Formulário inválido');
      this.toastr.error('Formulário inválido');
      return;
    }
    
    setTimeout(() => {
      this.loading = false;
      this._loading.loading.next(false);
    }, 300);
  }
}
