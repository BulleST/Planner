import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Produto, ProdutoRequest } from 'src/app/models/produto.model';
import { TipoAtivo } from 'src/app/models/tipoAtivo.model';
import { TipoLiquidez } from 'src/app/models/tipoLiquidez.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { DropdownService } from 'src/app/services/dropdown.service';

@Component({
    selector: 'app-form-produto',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormProdutoComponent implements OnInit {
    @Input() objeto: Produto = new Produto;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<ProdutoRequest> = new EventEmitter<ProdutoRequest>();

    // _tributacao: Tributacao[] = [];
    // _produtoTributacaoRel: ProdutoTributacaoRel[] = [];
    _tipoAtivo: TipoAtivo[] = [];
    _tipoRisco: TipoRisco[] = [];
    _tipoLiquidez: TipoLiquidez[] = [];
    loadingTributacao = true;
    loadingAtivo = true;
    loadingRisco = true;
    loadingLiquidez = true;


    constructor(
        private toastr: ToastrService,
        private dropdownService: DropdownService
    ) {

        // this.dropdownService.tributacao.subscribe(res => {
        //     this._tributacao = res.filter(x => !this.objeto.produtoTributacaoRel.map(y => y.id).includes(x.id))
        // });
        // this.dropdownService.getTributacao().subscribe({
        //     next: (res) => {
        //         this._tributacao = res.filter(x => !this.objeto.produtoTributacaoRel.map(y => y.tributacao_Id).includes(x.id))

        //         this._produtoTributacaoRel = this._tributacao.map(x => {
        //                                             return {
        //                                                 id: 0,
        //                                                 produto: this.objeto,
        //                                                 produto_Id: this.objeto.id,
        //                                                 tributacao_Id: x.id,
        //                                                 tributacao: x
        //                                             }
        //                                         })
        //         this.loadingTributacao = false;
        //     },
        //     error: (err) => {
        //         console.error(err)
        //         this.loadingTributacao = false;
        //     },
        //     complete: () => this.loadingTributacao = false
        // });

        this.dropdownService.tipoLiquidez.subscribe(res => this._tipoLiquidez = res);
        this.dropdownService.getLiquidez().subscribe({
            next: (res) => {
                this._tipoLiquidez = res
                this.loadingLiquidez = false;
            },
            error: (err) => {
                console.error(err)
                this.loadingLiquidez = false;
            },
            complete: () => this.loadingLiquidez = false
        });

        this.dropdownService.tipoRisco.subscribe(res => this._tipoRisco = res);
        this.dropdownService.getRisco().subscribe({
            next: (res) => {
                this._tipoRisco = res
                this.loadingRisco = false
            },
            error: (err) => {
                console.error(err)
                this.loadingRisco = false;
            },
            complete: () => this.loadingRisco = false
        });

        this.dropdownService.tipoAtivo.subscribe(res => this._tipoAtivo = res);
        this.dropdownService.getAtivo().subscribe({
            next: (res) => {
                this._tipoAtivo = res
                this.loadingAtivo = false
            },
            error: (err) => {
                console.error(err)
                this.loadingAtivo = false;
            },
            complete: () => this.loadingAtivo = false
        });

    }

    ngOnInit(): void {
    }
    move(e: any) {
        // console.log(e)
    }
    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = ['Campos inválidos'];
            return;
        }
        // if (this.objeto.produtoTributacaoRel.length == 0) {
        //     this.toastr.error('Selecione pelo menos uma tributação para continuar');
        //     this.erro = ['Selecione pelo menos uma tributação para continuar'];
        //     return;
        // }
        this.erro = [];

        let model: ProdutoRequest = {
            id: this.objeto.id,
            empresa_Id: this.objeto.empresa_Id,
            tipoAtivo_Id: this.objeto.tipoAtivo_Id, 
            tipoRisco_Id: this.objeto.tipoRisco_Id, 
            tipoLiquidez_Id: this.objeto.tipoLiquidez_Id, 
            // produtoTributacaoRel: this.objeto.produtoTributacaoRel.map(x => ({ tributacao_Id: x.tributacao_Id})),
            taxaAdm: this.objeto.taxaAdm, 
            taxaPfee: this.objeto.taxaPfee, 
            descricao: this.objeto.descricao.trim(),
        }

        this.sendData.emit(model);
    }
    // drop(event: CdkDragDrop<ProdutoTributacaoRel[]>) {
    //     if (event.previousContainer === event.container) {
    //         moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //     } else {
    //         transferArrayItem(
    //             event.previousContainer.data,
    //             event.container.data,
    //             event.previousIndex,
    //             event.currentIndex,
    //         );
    //     }
    //     this.objeto.produtoTributacaoRel.sort((x, y) => x.id - y.id)
    //     this._tributacao.sort((x, y) => x.id - y.id)
    // }
}