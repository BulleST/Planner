import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/user.service';
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
    objeto: Usuario = new Usuario;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        public userService: UsuarioService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        activatedRoute.params.subscribe(async p => {
            if (p['usuario_id']) {
                this.objeto.id = this.crypto.decrypt(p['usuario_id']);
                this.objeto = await lastValueFrom(this.userService.get(this.objeto.id));
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
