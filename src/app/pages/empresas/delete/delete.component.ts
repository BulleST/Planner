import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  faTimes = faTimes;
	modalOpen = false;
	objeto: Empresa = new Empresa;
	erro: any[] = [];
	loading = false;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private empresaService: EmpresaService,
		private crypto: Crypto
	) {
		this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});

		this.activatedRoute.params.subscribe(res => {
			if (res['id']) {
				this.objeto.id = this.crypto.decrypt(res['id']);
				// this.empresaService.get(this.objeto.id).subscribe({
				// 	next: (res:string|Empresa) => {

				// 	}
				// })
			}
		})
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['empresas']);
		}, 200);
	}

	send() {
		this.loading = true;
		this.erro = [];
		this.empresaService.delete(this.objeto);
		this.voltar();
		this.toastr.success('Operação concluída');
		this.loading = false;
	}
}
