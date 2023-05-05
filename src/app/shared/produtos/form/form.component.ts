import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Produto, ProdutoRequest } from 'src/app/models/produto.model';
import { TipoAtivo } from 'src/app/models/tipoAtivo.model';
import { TipoLiquidez } from 'src/app/models/tipoLiquidez.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-form-produto',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormProdutoComponent implements OnDestroy {
    @Input() objeto: Produto = new Produto;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<ProdutoRequest> = new EventEmitter<ProdutoRequest>();

    _tipoAtivo: TipoAtivo[] = [];
    _tipoRisco: TipoRisco[] = [];
    _tipoLiquidez: TipoLiquidez[] = [];
    loadingTributacao = true;
    loadingAtivo = true;
    loadingRisco = true;
    loadingLiquidez = true;
    subscription: Subscription[] = [];


    constructor(
        private toastr: ToastrService,
        private dropdownService: DropdownService
    ) {
        
        var tipoLiquidez = this.dropdownService.tipoLiquidez.subscribe(res => this._tipoLiquidez = res);
        this.subscription.push(tipoLiquidez);
        lastValueFrom(this.dropdownService.getLiquidez())
            .then((res) => this._tipoLiquidez = res)
            .finally(() => this.loadingLiquidez = false);


        var tipoRisco = this.dropdownService.tipoRisco.subscribe(res => this._tipoRisco = res);
        this.subscription.push(tipoRisco);
        lastValueFrom(this.dropdownService.getRisco())
            .then((res) => this._tipoRisco = res)
            .catch()
            .finally(() => this.loadingRisco = false);


        var tipoAtivo = this.dropdownService.tipoAtivo.subscribe(res => this._tipoAtivo = res);
        this.subscription.push(tipoAtivo);
        lastValueFrom(this.dropdownService.getAtivo())
            .then(res => this._tipoAtivo = res)
            .finally(() => this.loadingAtivo = false);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = ['Campos inválidos'];
            return;
        }
        this.erro = [];

        let model: ProdutoRequest = {
            id: this.objeto.id,
            empresa_Id: this.objeto.empresa_Id,
            tipoAtivo_Id: this.objeto.tipoAtivo_Id,
            tipoRisco_Id: this.objeto.tipoRisco_Id,
            tipoLiquidez_Id: this.objeto.tipoLiquidez_Id,
            descricao: this.objeto.descricao.trim(),
        }

        this.sendData.emit(model);
    }
}