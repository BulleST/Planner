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
    tributacao: Tributacao[] = [];
    tipoAtivo: TipoAtivo[] = [];
    tipoRisco: TipoRisco[] = [];
    tipoLiquidez: TipoLiquidez[] = [];
    tributacaoSelected?: Tributacao;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private crypto: Crypto,
        private modal: ModalOpen,
        private dropdownService: DropdownService
    ) {

        this.dropdownService.getTributacao().subscribe(res => this.tributacao = res);
        this.dropdownService.tributacao.subscribe(res => this.tributacao = res);

        this.dropdownService.getLiquidez().subscribe(res => this.tipoLiquidez = res);
        this.dropdownService.tipoLiquidez.subscribe(res => this.tipoLiquidez = res);

        this.dropdownService.getRisco().subscribe(res => this.tipoRisco = res);
        this.dropdownService.tipoRisco.subscribe(res => this.tipoRisco = res);

        this.dropdownService.getAtivo().subscribe(res => this.tipoAtivo = res);
        this.dropdownService.tipoAtivo.subscribe(res => this.tipoAtivo = res);
        
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
    }

    voltar() {
        this.modal.setOpen(false);
        setTimeout(() => {
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        }, 200);
    }

    send(form: NgForm) {
        this.sendData.emit(form);
    }

    dragStart(event:any, product: Tributacao) {
        this.tributacaoSelected = product;
    }
    drop(event: any) {
        console.log(event)
        if (this.tributacaoSelected) {
            let draggedProductIndex = this.findIndex(this.tributacaoSelected);
            this.objeto.tributacao = [...this.objeto.tributacao, this.tributacaoSelected];
            this.tributacao = this.tributacao.filter((val,i) => i!=draggedProductIndex);
            this.tributacaoSelected = undefined;
        }
    }
    
    dragEnd(event: any) {
        console.log(event)
        this.tributacaoSelected = undefined;
    }
    
    findIndex(product: Tributacao) {
        let index = -1;
        for(let i = 0; i < this.tributacao.length; i++) {
            if (product.id === this.tributacao[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
    
}