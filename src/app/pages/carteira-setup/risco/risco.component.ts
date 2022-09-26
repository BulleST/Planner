import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraRequest } from 'src/app/models/carteira-produto-rel';
import { CarteiraRiscoRel } from 'src/app/models/carteira-risco-rel.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { TipoRisco } from 'src/app/models/tipoRisco.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { DropdownService } from 'src/app/services/dropdown.service';
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
    erro: string[] = [] as string[];
    loading = false;
    _tiposRisco: TipoRisco[] = [];
    loadingRisco = true;
    carteiraSetup: CarteiraSetup = new CarteiraSetup;
    percentualDisponivel = 100;
    isEdit = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private setupService: CarteiraSetupService,
        private dropdownService: DropdownService,
        private alertService: AlertService,
        private crypto: Crypto
    ) {
        this.activatedRoute.params.subscribe(res => {
            if (res['object']) {
                this.isEdit = true;
                this.objeto = this.crypto.decrypt(res['object']) as CarteiraRiscoRel;
                this.objeto.tipoRisco = this._tiposRisco.find(x => x.id == this.objeto.tipoRisco_Id) ?? undefined as unknown as TipoRisco;
            } else {
                this.isEdit = false;
            }
        })
        
        this.dropdownService.tipoRisco.subscribe(res => {
            if (this.activatedRoute.snapshot.params['object']) {
                this._tiposRisco = res;
                this.objeto.tipoRisco = this._tiposRisco.find(x => x.id == this.objeto.tipoRisco_Id) ?? undefined as unknown as TipoRisco;
            } else {
                let carteiraSetup = this.setupService.getObject().value as CarteiraRequest;
                let riscosCadastrados = carteiraSetup.carteiraRiscoRel.map(x => x.tipoRisco_Id);
                this._tiposRisco = res.filter(x => !riscosCadastrados.includes(x.id));
            }
        });
        this.dropdownService.getRisco().subscribe({
            next: (res) => {
                this.loadingRisco = false;
            },
            error: (err) => {
                console.error(err)
                this.loadingRisco = false;
            },
            complete: () => this.loadingRisco = false
        });

        this.setupService.percentualDisponivelRisco.subscribe(res => this.percentualDisponivel = res);
        this.setupService.getObject().subscribe(res => this.carteiraSetup = res);
     

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
        if (this.isEdit) {
            this.edit();
        } else {
            this.create();
        }
        this.toastr.success('OK');
        this.voltar();
        this.loading = false;
    }

    create() {
        console.log('create')
        let carteiraSetup = this.setupService.getObject().value;
        let existe = carteiraSetup.carteiraRiscoRel.find(x => x.tipoRisco_Id == this.objeto.tipoRisco_Id);
        if (existe) {
            this.toastr.error('Esse risco já foi adicionado');
        } else {
            carteiraSetup.carteiraRiscoRel.push(this.objeto);
            this.setupService.setObject(carteiraSetup);
        }
        if (this.percentualDisponivel == 0) {
            this.alertService.info('Percentual máximo atingido, continue preenchendo os campos')
        }
    }

    edit() {
        console.log('edit')
        console.log(this.objeto)
        let carteiraSetup = this.setupService.getObject().value;
        let index = carteiraSetup.carteiraRiscoRel.findIndex(x => x.tipoRisco_Id == this.objeto.tipoRisco_Id);
        console.log(index)
        if (index != -1) {
            console.log(carteiraSetup.carteiraRiscoRel)
            carteiraSetup.carteiraRiscoRel.splice(index, 1, this.objeto);
            this.setupService.setObject(carteiraSetup)
        }
    }

    excluirRisco() {
        this.loading = true;
        this.erro = [];
        if (this.isEdit) {
            this.setupService.excluirRisco(this.objeto);
        }
        this.toastr.success('OK');
        this.voltar();
    }
}
