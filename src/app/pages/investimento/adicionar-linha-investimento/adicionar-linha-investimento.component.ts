import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Investimento } from 'src/app/models/investimento.model';
import { PlanejamentoInvestimentoRequest } from 'src/app/models/planejamento-investimento.model';
import { Tributacao } from 'src/app/models/tributacao.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { InvestimentoService } from 'src/app/services/investimento.service';
import { arrowDown, arrowUp, stringToDecimal } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
	selector: 'app-adicionar-linha-investimento',
	templateUrl: './adicionar-linha-investimento.component.html',
	styleUrls: ['./adicionar-linha-investimento.component.css']
})
export class AdicionarLinhaInvestimentoComponent implements OnInit {
	faTimes = faTimes;
	modalOpen = false;
	objeto: PlanejamentoInvestimentoRequest = new PlanejamentoInvestimentoRequest;
	erro: any[] = [];
	loading = false;

	tributacoes: Tributacao[] = [];
	investimentos: Investimento[] = [];

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private investimentoService: InvestimentoService,
        private dropdownService: DropdownService,
	) {
		this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});

		this.investimentoService.list_Investimento.subscribe(res => {
			res.sort((x, y) => x.id - y.id);
			this.investimentos = res;
		});
        this.dropdownService.getTributacao().subscribe(res => this.tributacoes = res);
        this.dropdownService.tributacao.subscribe(res => this.tributacoes = res);

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
		this.objeto.rentabilidade = stringToDecimal(this.objeto.rentabilidade.toString());
		this.objeto.montanteAtual = stringToDecimal(this.objeto.montanteAtual.toString());
		this.investimentoService.createInvestimento(this.objeto);
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
