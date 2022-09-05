import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto.model';
import { TipoAtivo } from 'src/app/models/tipoAtivo.model';
import { TipoLiquidez } from 'src/app/models/tipoLiquidez.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { Tributacao } from 'src/app/models/tributacao.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-form-produto',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormProdutoComponent implements OnInit {
    @Input() objeto: Produto = new Produto;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();

    _tributacao: Tributacao[] = [];
    _tipoAtivo: TipoAtivo[] = [];
    _tipoRisco: TipoRisco[] = [];
    _tipoLiquidez: TipoLiquidez[] = [];
    tributacaoSelected?: Tributacao;
    loadingTributacao = true;
    loadingAtivo = true;
    loadingRisco = true;
    loadingLiquidez = true;


    constructor(
        private toastr: ToastrService,
        private dropdownService: DropdownService
    ) {

        this.dropdownService.tributacao.subscribe(res => {
            this._tributacao = res.filter(x => !this.objeto.tributacao.map(y => y.id).includes(x.id))
        });
        this.dropdownService.getTributacao().subscribe({
            next: (res) => {
                this._tributacao = res.filter(x => !this.objeto.tributacao.map(y => y.id).includes(x.id))
            },
            error: (err) => console.error(err),
            complete: () => this.loadingTributacao = false
        });

        this.dropdownService.tipoLiquidez.subscribe(res => this._tipoLiquidez = res);
        this.dropdownService.getLiquidez().subscribe({
            next: (res) => this._tipoLiquidez = res,
            error: (err) => console.error(err),
            complete: () => this.loadingLiquidez = false
        });

        this.dropdownService.tipoRisco.subscribe(res => this._tipoRisco = res);
        this.dropdownService.getRisco().subscribe({
            next: (res) => this._tipoRisco = res,
            error: (err) => console.error(err),
            complete: () => this.loadingRisco = false
        });

        this.dropdownService.tipoAtivo.subscribe(res => this._tipoAtivo = res);
        this.dropdownService.getAtivo().subscribe({
            next: (res) => this._tipoAtivo = res,
            error: (err) => console.error(err),
            complete: () => this.loadingAtivo = false
        });

    }

    ngOnInit(): void {
    }

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = ['Campos inválidos'];
            return;
        }
        if (this.objeto.tributacao.length == 0) {
            this.toastr.error('Selecione pelo menos uma tributação para continuar');
            this.erro = ['Selecione pelo menos uma tributação para continuar'];
            return;
        }
        this.erro = [];
        this.sendData.emit(form);
    }
    drop(event: CdkDragDrop<Tributacao[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
        this.objeto.tributacao.sort((x, y) => x.id - y.id)
        this._tributacao.sort((x, y) => x.id - y.id)
    }
}