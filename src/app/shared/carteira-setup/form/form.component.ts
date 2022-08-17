import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetupRequest } from 'src/app/models/carteiraSetup-produto.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Tributacao } from 'src/app/models/tributacao.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-form-carteira-setup',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormCarteiraSetupComponent implements OnInit {
    @Input() objeto: CarteiraSetupRequest = new CarteiraSetupRequest;
    @Input() loading = false;
    @Input() erro: any[] = [];

    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();
    tributacao: Tributacao[] = [];
    carteirasSetup: CarteiraSetup[] = [];
    novaCarteiraSetup = false;
    loadingCarteiras = true;
    loadingTributacao = false;

    empresa: Empresa = new Empresa;

    empresa_Id: number = 0

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private crypto: Crypto,
        private modal: ModalOpen,
        private dropdownService: DropdownService
    ) {
        this.empresaService.objeto.subscribe(res => this.empresa = res ?? new Empresa);

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
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = ['Campos inválidos'];
            return;
        }
        this.erro = [];
        this.sendData.emit(form);
    }

    novaCarteira(criarNova?: boolean) {
        if (criarNova != undefined) {
            this.novaCarteiraSetup = criarNova;
        } else {
            this.novaCarteiraSetup = this.objeto.carteiraSetup == undefined;
        }

        if (!this.novaCarteiraSetup) {
            delete this.objeto.carteiraSetupNova;
        }
    }
}


