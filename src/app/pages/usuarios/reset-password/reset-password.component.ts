import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/user.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    faTimes = faTimes;
    modalOpen = false;
    erro: any[] = [];
    loading = false;
    url = '';
    objeto: Usuario = new Usuario;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private userService: UsuarioService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        this.activatedRoute.params.subscribe(res => {
            if (res['usuario_id']) {
                this.objeto.id = this.crypto.decrypt(res['usuario_id']);
            } else {
                this.voltar();
            }
        });
        
       
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
        this.userService.resetPassword(this.objeto.id).subscribe({
            next: async res => {
                this.voltar();
            },
            error: err => {
                this.loading = false;
            }
        });

    }

}
