import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
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
    objeto: Cliente = new Cliente;
    subscription: Subscription[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        public clienteService: ClienteService,
        private crypto: Crypto,
    ) {

        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        var params = activatedRoute.params.subscribe(async p => {
            if (p['cliente_id']) {
                this.objeto.id = this.crypto.decrypt(p['cliente_id']);
                this.objeto = await lastValueFrom(this.clienteService.get(this.objeto.id));
                setTimeout(() => {
                    this.modal.setOpen(true);
                }, 200);

            } else {
                this.voltar();
            }
        });
        this.subscription.push(params);

    }

    ngOnDestroy(): void {
        this.modal.setOpen(false);
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar();
    }

}
