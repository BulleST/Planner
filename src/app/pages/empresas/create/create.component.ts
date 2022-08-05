import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  faTimes = faTimes;
	modalOpen = false;
	objeto: Empresa = new Empresa;
	erro: any[] = [];
	loading = false;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private empresaService: EmpresaService,
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

	send(form: NgForm) {
		this.loading = true;
		this.erro = [];
		this.empresaService.create(this.objeto);
		this.voltar();
		this.toastr.success('Linha adicionada');
		this.loading = false;
	}
}
