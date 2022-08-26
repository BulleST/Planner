import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { x } from 'pdfkit';
import { Empresa } from 'src/app/models/empresa.model';
import { PercentualRisco } from 'src/app/models/percentual-risco.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { Produto } from 'src/app/models/produto.model';
import { Tributacao } from 'src/app/models/tributacao.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-form-percentual-risco',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormPercentualRiscoComponent implements OnInit {
    faTrashAlt = faTrashAlt;
    @Input() objeto: PercentualRisco = new PercentualRisco;
    @Input() loading = false;
    @Input() erro: any[] = [];

    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();
    perfilInvestidor: PerfilInvestidor[] = [];
    loadingPerfilInvestidor = true;
    empresa: Empresa = new Empresa;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private modal: ModalOpen,
        private dropdownService: DropdownService
    ) {
        this.empresaService.empresa.subscribe(res => this.empresa = res ?? new Empresa);
        this.dropdownService.getPerfilInvestidor().subscribe(res => {
            this.loadingPerfilInvestidor = false;
            this.perfilInvestidor = res;
        })
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

}


