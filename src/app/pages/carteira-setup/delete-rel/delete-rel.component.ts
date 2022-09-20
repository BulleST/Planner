import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { CarteiraProdutoRel } from 'src/app/models/carteira-produto-rel';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CarteiraProdutoRelService } from 'src/app/services/setup-rel.service';
import { CarteiraSetupService } from 'src/app/services/setup.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-delete-rel',
  templateUrl: './delete-rel.component.html',
  styleUrls: ['./delete-rel.component.css']
})
export class DeleteRelComponent implements OnInit {

    faTimes = faTimes;
    modalOpen = false;
    objeto: CarteiraProdutoRel = new CarteiraProdutoRel;
    erro: any[] = [];
    loading = false;
    carteiraSetup: CarteiraSetup = new CarteiraSetup;
    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private setupService: CarteiraSetupService,
        private setupRelService: CarteiraProdutoRelService,
        private crypto: Crypto,
        private mask: MaskApplierService
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });
        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
       
        activatedRoute.paramMap.subscribe(p => {
            if (p.get('setup_id') && p.get('rel_id')) {
                this.objeto.id = this.crypto.decrypt(p.get('rel_id')); 
                this.objeto.carteiraSetup_Id = this.crypto.decrypt(p.get('setup_id'));

                if (urlArray.includes('empresas/cadastrar')) {
                    this.carteiraSetup = this.empresaService.object?.carteiraSetup.find(x => x.id == this.objeto.carteiraSetup_Id) as unknown as CarteiraSetup;
                    this.objeto = this.carteiraSetup.carteiraProdutoRel.find(x => x.id == this.objeto.id) as unknown as CarteiraProdutoRel;
                    this.objeto.produtoTributacaoRel.tributacao.aliquota = this.mask.applyMask(this.objeto.produtoTributacaoRel.tributacao.aliquota.toString(), 'separator') + '%' as unknown as number;
                    if (this.carteiraSetup && this.objeto) {
                        setTimeout(() => {
                            this.modal.setOpen(true);
                        }, 200);
                    } else {
                        this.toastr.error('Setup não encontrado')
                        this.voltar();
                    }
                }
            }
        })
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
            let result = this.setupRelService.delete_Rel_To_Empresa_List(this.objeto.carteiraSetup_Id, this.objeto.id);
            if (result)
                this.voltar();
        }
        else {
            // Enviar para a API
            this.toastr.success('Operação concluída');
        }
        this.loading = false;
    }

}
