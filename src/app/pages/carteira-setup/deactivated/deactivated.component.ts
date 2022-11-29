import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faL, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraProdutoRelService } from 'src/app/services/setup-rel.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-deactivated',
    templateUrl: './deactivated.component.html',
    styleUrls: ['./deactivated.component.css']
})
export class DeactivatedComponent implements OnInit {

    faTimes = faTimes;
    modalOpen = false;
    id: number = 0;
    active: boolean = false;
    erro: any[] = [];
    loading = false;
    urlArray = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private setupService: CarteiraSetupService,
        private setupRelService: CarteiraProdutoRelService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        activatedRoute.params.subscribe(p => {
            if (p['setup_id']) {
                this.id = this.crypto.decrypt(p['setup_id']);
                this.active = this.activatedRoute.snapshot.routeConfig?.path?.includes('desativar') ? false : true;
                setTimeout(() => {
                    this.modal.setOpen(true);
                }, 200);
            } else {
                this.voltar();
            }
        })
    }

    ngOnInit(): void {
    }

    voltar() {
        this.modal.voltar();
    }

    send() {
        this.loading = true;
        this.erro = [];

        // Enviar para a API
        this.setupService.deactivated(this.id, this.active)
            .subscribe({
                next: async res => {
                    await lastValueFrom(this.setupService.getList());
                    this.voltar();
                },
                error: err => {
                    this.loading = false;
                }
            })

    }

}
