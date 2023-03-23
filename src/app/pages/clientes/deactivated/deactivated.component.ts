import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { Produto } from 'src/app/models/produto.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
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
    objeto: Cliente = new Cliente;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        public clienteService: ClienteService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        activatedRoute.params.subscribe(async p => {
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


    }

    ngOnInit(): void {
    }

    voltar() {
        this.modal.voltar();
    }

}
