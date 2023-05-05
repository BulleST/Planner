import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
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
export class DeactivatedComponent implements OnDestroy {

    faTimes = faTimes;
    modalOpen = false;
    erro: any[] = [];
    loading = false;
    url = '';
    objeto: CarteiraSetup = new CarteiraSetup;
    subscription: Subscription[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        public setupService: CarteiraSetupService,
        private crypto: Crypto,
    ) {

        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        var params = activatedRoute.params.subscribe(async p => {
            if (p['setup_id']) {
                this.objeto.id = this.crypto.decrypt(p['setup_id']);
                this.objeto = await lastValueFrom(this.setupService.get(this.objeto.id));
                
            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar();
    }

}
