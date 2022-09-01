import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetupRelRequest } from 'src/app/models/carteiraSetup-produto.model';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    faTimes = faTimes;
    faWallet = faWallet;
    modalOpen = false;
    objeto: CarteiraSetupRelRequest = new CarteiraSetupRelRequest;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;
    produtos: Produto[] = [];
    carteirasSetup: CarteiraSetup[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private crypto: Crypto,
        private setupService: CarteiraSetupService,
        private produtoService: ProdutoService,
        private empresaService: EmpresaService,
        private dropdownService: DropdownService,
    ) {

        activatedRoute.paramMap.subscribe(p => {
            if (p.get('empresa_id')) { // Rota = setup/cadastrar/<empresa_id>
                this.objeto.empresa_Id = this.crypto.decrypt(p.get('empresa_id'));
                this.loadingProduto = true;
                this.produtoService.getList(this.objeto.empresa_Id).subscribe(res => {
                    this.loadingProduto = false;
                    this.produtos = res;
                });
            } else {
                var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
                if (urlArray.includes('empresas/cadastrar/')) {
                    this.empresaService.createEmpresaObject.subscribe(res => {
                        this.produtos = res?.produto ?? [];
                    });
                    this.dropdownService.getCarteiraSetup_In_Empresa_Creation()
                                            .subscribe(res => this.carteirasSetup = res);
                }
            }

            setTimeout(() => {
                this.modal.setOpen(true);
            }, 200);
        })

        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    voltar() {
        this.modal.setOpen(false);
        setTimeout(() => {
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        }, 200);
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];

        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (urlArray.includes('empresas/cadastrar')) {
            var result = this.setupService.add_To_Empresa_List(this.objeto);
            if (result){
                this.voltar();
            }
        } else if (urlArray.includes('empresas/editar')) {
            // Enviar para a API
        }
        else {
            // Enviar para a API
            this.toastr.success('Operação concluída');
        }

        this.loading = false;
    }
}