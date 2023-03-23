import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    faTimes = faTimes;
    modalOpen = false;
    objeto: Usuario = new Usuario;
    erro: any[] = [];
    loading = false;
    url = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private userService: UsuarioService,
        private empresaService: EmpresaService,
        private crypto: Crypto
    ) {
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        if (this.url.includes('empresas/editar')) {
            activatedRoute.parent?.parent?.params.subscribe(p => {
                if (p['empresa_id']) {
                    this.objeto.empresa_Id = this.crypto.decrypt(p['empresa_id']);
                } else {
                    this.voltar();
                }
            });
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



    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar')) {
            let result = this.userService.add_To_Empresa_List(this.objeto);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            this.userService.create(this.objeto).subscribe({
                next: async (res) => {
                    this.modal.voltar();
                    var users = await lastValueFrom(this.userService.getList());
                    if (this.url.includes('empresas/editar')) {
                        var empresa = this.empresaService.object;
                        empresa.account = users;
                        this.empresaService.setObject(empresa, 'edit usuario');
                    }
                },
                error: (error) => {
                    this.loading = false;
                },
            });
        }
    }

}