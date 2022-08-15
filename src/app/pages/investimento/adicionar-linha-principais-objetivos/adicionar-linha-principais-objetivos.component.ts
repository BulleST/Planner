import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Tributacao } from 'src/app/models/tributacao.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { InvestimentoService } from 'src/app/services/investimento.service';
import { arrowDown, arrowUp, stringToDecimal } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
	selector: 'app-adicionar-linha-principais-objetivos',
	templateUrl: './adicionar-linha-principais-objetivos.component.html',
	styleUrls: ['./adicionar-linha-principais-objetivos.component.css']
})
export class AdicionarLinhaPrincipaisObjetivosComponent implements OnInit {
	faTimes = faTimes;
	modalOpen = false;
	objeto: string = '';
	erro: any[] = [];
	loading = false;


	constructor(
		private router: Router,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private investimentoService: InvestimentoService,
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
		this.investimentoService.createObjetivo(this.objeto);
		this.voltar();
		this.toastr.success('Linha adicionada');
		this.loading = false;
	}

	arrowUp(value: number) {
		return arrowUp(value)
	}

	arrowDown(value: number, allowNegative: boolean = false) {
		return arrowDown(value, allowNegative)
	}

}
