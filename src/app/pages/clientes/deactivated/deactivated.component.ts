import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { Cliente } from 'src/app/models/cliente.model';
import { AccountService } from 'src/app/services/account.service';
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

    account?: Account;

    routerBack: string[] = ['../../'];
    routeBackOptions: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        private crypto: Crypto,
        public clienteService: ClienteService,
        private accountService: AccountService,
    ) {
        this.routeBackOptions = { relativeTo: this.activatedRoute };

        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        this.account = this.accountService.accountValue;

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        var params = activatedRoute.params.subscribe(async p => {
            if (p['cliente_id']) {
                this.objeto.id = this.crypto.decrypt(p['cliente_id']);
                lastValueFrom(this.clienteService.get(this.objeto.id))
                    .then(res => {
                        this.objeto = res;
                        if (this.account?.perfilAcesso_Id != 3 || (this.account?.perfilAcesso_Id == 3 && this.account?.id == res.account_Id)) {
                            setTimeout(() => {
                                this.modal.setOpen(true);
                            }, 200);
                        } else {
                            this.voltar();
                        }
                    })
                    .catch(res => {
                        this.voltar();
                    });
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
        this.modal.voltar(this.routerBack, this.routeBackOptions);
    }

}
