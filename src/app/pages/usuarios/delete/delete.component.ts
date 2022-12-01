import { Location } from '@angular/common';
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
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

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
        
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            this.objeto = this.empresaService.empresaObject.value.usuario.find(x => x.id == this.objeto.id) as Usuario;
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
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.userService.delete_To_Empresa_List(this.objeto.id);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }

            this.userService.delete(this.objeto.id).subscribe({
                next: async res => {
                    await lastValueFrom(this.userService.getList())
                    this.voltar();
                    this.userService.setObject(new Usuario);
                },
                error: err => {
                    this.loading = false;
                }
            });
        }

    }

}
