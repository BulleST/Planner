import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Produto, ProdutoRequest } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    faTimes = faTimes;
	modalOpen = false;
	objeto: Produto = new Produto;
	erro: any[] = [];
	loading = false;

	constructor(
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private empresaService: EmpresaService,
		private produtoService: ProdutoService,
        private crypto: Crypto,
	) {
		this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});

        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        activatedRoute.paramMap.subscribe(p => {
            if (p.get('produto_id')) {
                this.objeto.id = this.crypto.decrypt(p.get('produto_id'));
                if (urlArray.includes('empresas/cadastrar')) { // Se estiver na página de cadastro de uma empresa nova
                    let obj = this.empresaService.object?.produto.find(x => x.id == this.objeto.id);
                    if (obj) {
                        this.objeto = obj;
                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    }
                    else {
                        this.voltar();
                    }
                } 
                else { 
                    // Se estiver no módulo de usuários
                    if (urlArray.includes('empresas/editar')) {
                        // Se estiver na página de visão geral de uma empresa já existente ou 
                    }
                    this.produtoService.get(this.objeto.id).subscribe({
                        next: (produto) => {
                            this.objeto = produto;
                            this.objeto.tributacao = produto.produtoTributacaoRel.map(x => x.tributacao)
                            console.log(produto)
                            setTimeout(() => {
                                this.modal.setOpen(true);
                            }, 200);
                        }, 
                        error: (err) => {
                            this.toastr.error('Não foi possível carregar esse registro');
                            this.voltar();
                        },
                        complete: () => {

                        }
                    });
                }
            } else {
                this.voltar();
            }
        })
	}

	ngOnInit(): void {
	}

	voltar() {
        this.modal.voltar();
	}

	send(model: ProdutoRequest) {
		this.loading = true;
		this.erro = [];

        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (urlArray.includes('empresas/cadastrar')) {
            let result = this.produtoService.edit_To_Empresa_Create(this.objeto); 
            if (result) {
                this.voltar();
                this.toastr.success('Operação concluída');
            }
        }
        else {
            // Enviar para a API
            if (urlArray.includes('empresas/editar')) {
                // Enviar para a API
            }

            this.produtoService.edit(model).subscribe({
                next: (res) => {
                    this.modal.voltar();
                    this.produtoService.getList().subscribe();
                },
                error: (res) => {},
                complete: () => {},
            })
        }
        
		this.loading = false;
	}
}