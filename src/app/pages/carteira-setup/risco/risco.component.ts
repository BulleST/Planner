import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraRequest } from 'src/app/models/carteira-produto-rel';
import { CarteiraRiscoRel } from 'src/app/models/carteira-risco-rel.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraProdutoRelService } from 'src/app/services/setup-rel.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-risco',
    templateUrl: './risco.component.html',
    styleUrls: ['./risco.component.css']
})
export class RiscoComponent implements OnInit {
    faTimes = faTimes;
    faWallet = faWallet;
    modalOpen = false;
    objeto: CarteiraRiscoRel = new CarteiraRiscoRel;
    erro: any[] = [];
    loading = false;
    _tipoRisco: TipoRisco[] = [];
    loadingRisco = true;
    carteiraSetup: CarteiraSetup = new CarteiraSetup;
    maxPercentual = 100;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private setupService: CarteiraSetupService,
        private dropdownService: DropdownService,
        private alertService: AlertService,
        private crypto: Crypto
    ) {
        this.dropdownService.tipoRisco.subscribe(res => {
            let carteiraSetup = this.setupService.getObject().value as CarteiraRequest;
            let riscosCadastrados = carteiraSetup.carteiraRiscoRel.map(x => x.tipoRisco_Id);
            this._tipoRisco = res.filter(x => !riscosCadastrados.includes(x.id))
        });
        this.dropdownService.getRisco().subscribe({
            next: (res) => {
                this.loadingRisco = false
            },
            error: (err) => {
                console.error(err)
                this.loadingRisco = false;
            },
            complete: () => this.loadingRisco = false
        });

        this.setupService.getObject().subscribe(res => {
            this.carteiraSetup = res;
            this.maxPercentual = 100 - res.carteiraRiscoRel.map(res => res.percentual).reduce((x,y) => x + y);
        })
        this.activatedRoute.params.subscribe(res => {
            if (res['object']) {
                this.objeto = this.crypto.decrypt(res['object']) as CarteiraRiscoRel;
            }
            console.log('params: ', res)
        })

        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);

        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });
    }

    ngOnInit(): void { }

    voltar() {
        this.modal.voltar();
    }

    send() {
        this.loading = true;
        this.erro = [];

        let carteiraSetup = this.setupService.getObject().value as CarteiraRequest;
        let riscosExistentes = carteiraSetup.carteiraRiscoRel.map(x => x.tipoRisco_Id);
        let a = riscosExistentes.includes(this.objeto.tipoRisco_Id)
        if (a) {
            this.toastr.error('Esse risco já foi adicionado');
        } else {
            carteiraSetup.carteiraRiscoRel.push(this.objeto);
            this.setupService.setObject(carteiraSetup);
            this.voltar();

            if (this.maxPercentual == 0) {
                this.alertService.info('Percentual máximo atingido, continue preenchendo os campos')
            } else {
                this.toastr.success('OK')
            }
        }

        this.loading = false;
    }
}
