import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/user.service.ts';
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
    objeto: Usuario = new Usuario;
    erro: any[] = [];
    loading = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private userService: UsuarioService,
        private crypto: Crypto,
        private table: Table
    ) {
        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        activatedRoute.paramMap.subscribe(p => {
            if (p.get('user_id')) {
                this.objeto.id = this.crypto.decrypt(p.get('user_id'));
                if (urlArray.includes('empresas/cadastrar')) { // Se estiver na página de cadastro de uma empresa nova
                    let user = this.empresaService.createObjeto?.usuario.find(x => x.id == this.objeto.id);
                    if (user) {
                        this.objeto = user;
                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    } else {
                        this.voltar();
                    }
                } 
                else { 
                    /* Se estiver na página de visão geral de uma empresa já existente ou
                     Se estiver no módulo de usuários */
                    if (urlArray.includes('empresas/editar')) {
                    
                    }
                    this.userService.get(this.objeto.id).subscribe({
                        next: (user) => {
                            this.objeto = user;
                            setTimeout(() => {
                                this.modal.setOpen(true);
                            }, 200);
                        }, 
                        error: (err) => {
                            this.toastr.error('Não foi possível carregar esse usuário');
                            this.voltar();
                        },
                        complete: () => {

                        }
                    });
                }
                
            }
        });
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });
        this.table.loading.subscribe(res => this.loading = res);
    }

    ngOnInit(): void {
    }

    voltar() {
        this.modal.voltar();
    }

    send() {
        this.loading = true;
        this.erro = [];

        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (urlArray.includes('empresas/cadastrar')) {
            // excluir de empresa em processo cadastro
            let result = this.userService.delete_To_Empresa_List(this.objeto.id); 
            if (result)
                this.voltar();
                this.toastr.success('Operação concluída');
        }
        else { // Excluir de uma empresa que já existe
            // Enviar para a API
            this.userService.delete(this.objeto.id).subscribe({
                next: res => {
                    this.voltar();
                },
                error: res => {},
                complete: () => {
                    this.loading = false;
                },
            })
        }
    }

}
