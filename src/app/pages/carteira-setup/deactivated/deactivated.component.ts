import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { EmpresaService } from 'src/app/services/empresa.service';
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
    erro: any[] = [];
    loading = false;
    url = '';
    objeto: CarteiraSetup = new CarteiraSetup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private setupService: CarteiraSetupService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        activatedRoute.params.subscribe(async p => {
            if (p['setup_id']) {
                this.objeto.id = this.crypto.decrypt(p['setup_id']);
                this.objeto = await lastValueFrom(this.setupService.get(this.objeto.id));
                
            } else {
                this.voltar();
            }
        });


        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.empresaObject.value.carteiraSetup.find(x => x.id == this.objeto.id) as CarteiraSetup;
        }
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    voltar() {
        this.modal.voltar();
    }

    send() {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.setupService.delete_To_Empresa_List(this.objeto.id);
            if (result)
                this.voltar();
            this.loading = false;
        }
        else {
            // Enviar para a API
            this.setupService.deactivated(this.objeto.id, !this.objeto.ativo).subscribe({
                next: async res => {
                    await lastValueFrom(this.setupService.getList());
                    this.voltar();
                    this.setupService.setObject(new CarteiraSetup);
                },
                error: err => {
                    this.loading = false;
                }
            })
        }
    }
}
