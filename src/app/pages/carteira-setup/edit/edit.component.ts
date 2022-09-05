import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetupRelRequest } from 'src/app/models/carteiraSetup-produto.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { ProdutoTributacaoRel } from 'src/app/models/produto-tributacao-rel.model';
import { Produto } from 'src/app/models/produto.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
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
    objeto: CarteiraSetupRelRequest = new CarteiraSetupRelRequest;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;
    produtos: Produto[] = [];
    carteirasSetup: CarteiraSetup[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private crypto: Crypto,
        private setupService: CarteiraSetupService,
        private empresaService: EmpresaService,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        this.empresaService.empresaObject.subscribe(res => {
            this.carteirasSetup = res.carteiraSetup;
            this.produtos = res.produto
        });

        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        activatedRoute.paramMap.subscribe(p => {
            if (p.get('setup_id') && p.get('rel_id')) {
                this.objeto.carteiraSetup_Id = this.crypto.decrypt(p.get('setup_id'));
                this.objeto.id = this.crypto.decrypt(p.get('rel_id'));

                if (urlArray.includes('empresas/cadastrar')) {

                    let objeto = this.empresaService.object?.carteiraSetup
                        .find(x => x.id == this.objeto.carteiraSetup_Id);
                    let rel = objeto?.carteiraProdutoRel
                            .find(x => x.id == this.objeto.id);
                    
                    if (objeto && rel) {
                        this.objeto = {
                            id: rel.id, 
                            empresa_Id: 0, 
                            carteiraSetup: objeto.nome, 
                            carteiraSetup_Id: objeto.id,
                            percentual: rel.percentual, 
                            produtoTributacaoRel: objeto.carteiraProdutoRel.map(x => x.produtoTributacaoRel)
                        };
                    }
                 

                    if (objeto) {
                        if (this.objeto.id) {
                            // console.log(objeto.carteiraProdutoRel.find(x => x.id == this.objeto.id))
                        }
                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);

                    } else {
                        this.voltar();
                    }
                } else {
                    if (urlArray.includes('empresas/editar')) {

                    }
                    this.setupService.get(this.objeto.id).subscribe({
                        next: (res) => {

                            // this.objeto = res.carteiraProdutoRel.map(x => {
                            //     return {
                            //         id: x.id,
                            //         empresa_Id: res.empresa_Id,
                            //         carteiraSetup_Id: res.id, // Id da carteiraSetup
                            //         carteiraSetup: res.nome, // Nome da CarteiraSetup
                            //         percentual: x.percentual,
                            //         produto: x.produtoTributacaoRel.produto,
                            //         produto_Id: x.produtoTributacaoRel.produto_Id,
                            //         tributacao: x.produtoTributacaoRel.tributacao,
                            //         tributacao_Id: x.produtoTributacaoRel.tributacao_Id,
                            //         aliqupta: x.produtoTributacaoRel.aliquota,
                            //     } as CarteiraSetupRelRequest;
                            // });
                        },
                        error: (err) => {
                            this.voltar()
                        },
                        complete: () => { },
                    })
                }
            }
        })
    }

    ngOnInit(): void {
    }

    voltar() {
        this.modal.voltar();
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (urlArray.includes('empresas/cadastrar')) {
            let result = this.setupService.add_To_Empresa_List(this.objeto);
            if (result)
                this.voltar();
        }
        else {
            if (urlArray.includes('empresas/editar')) {

            }
            // Enviar para a API
        }
        this.toastr.success('Operação concluída');
        this.loading = false;
    }
}