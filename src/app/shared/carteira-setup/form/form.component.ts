import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetupRelRequest } from 'src/app/models/carteiraSetup-produto.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Empresa, EmpresaCreateRequest } from 'src/app/models/empresa.model';
import { Produto } from 'src/app/models/produto.model';
import { Tributacao } from 'src/app/models/tributacao.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-form-carteira-setup',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormCarteiraSetupComponent implements OnInit {
    @Input() objeto: CarteiraSetupRelRequest = new CarteiraSetupRelRequest;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();
    @Input() produtos: Produto[] = [];
    @Input() carteirasSetup: CarteiraSetup[] = [];

    faTrashAlt = faTrashAlt;
    tributacoes: Tributacao[] = [];
    novaCarteiraSetup = true;
    loadingCarteiras = true;
    loadingTributacao = false;
    produto: Produto = undefined as unknown as Produto;
    tributacao: Tributacao = undefined as unknown as Tributacao;
    carteiraSetupObjeto?: CarteiraSetup;

    constructor(
        private toastr: ToastrService,
    ) {

    }

    ngOnInit(): void {
    }

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = ['Campos inválidos'];
            return;
        }
        this.erro = [];
        this.sendData.emit(form);
    }

    carteiraSetupChange() {
        this.novaCarteiraSetup = this.objeto.carteiraSetup_Id == undefined;
        if (this.novaCarteiraSetup) {
            this.novaCarteira();
        } else {
            this.objeto.carteiraSetup = '';
        }
    }

    novaCarteira() {
        this.novaCarteiraSetup = true;
        this.objeto.carteiraSetup_Id = undefined as unknown as number;
        this.objeto.carteiraSetup = '';
    }

    adicionarProduto() {
        if (this.produto == undefined) {
            this.toastr.error('Selecione um produto para adicionar');
        } else if (this.tributacao == undefined) {
            this.toastr.error('Selecione uma tributação para adicionar');
        } else {
            var jaExiste = this.objeto.produtoTributacaoRel.find(x => x.produto_Id == this.produto.id && x.tributacao_Id == this.tributacao.id);
            if (jaExiste) {
                this.toastr.error('Combinação já cadastrada')
            } else {
                this.objeto.produtoTributacaoRel.sort((x, y) => x.id - y.id);
                var lastId = this.objeto.produtoTributacaoRel.length == 0 ? 0 : this.objeto.produtoTributacaoRel[this.objeto.produtoTributacaoRel.length - 1].id;
                this.objeto.produtoTributacaoRel.push({
                    id: ++lastId,
                    produto: this.produto.descricao,
                    produto_Id: this.produto.id,
                    tributacao: this.tributacao.descricao,
                    tributacao_Id: this.tributacao.id,
                    aliquota: this.tributacao.aliquota
                });
            }
        }
    }

    removeItem(id: number) {
        if (this.objeto.produtoTributacaoRel.length == 0)
            return;
        var index = this.objeto.produtoTributacaoRel.findIndex(x => x.id == id);
        if (index != -1) {
            this.objeto.produtoTributacaoRel.slice(index, -1);
        }
    }
}


