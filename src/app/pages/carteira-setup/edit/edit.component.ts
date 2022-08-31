import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetupRelRequest } from 'src/app/models/carteiraSetup-produto.model';
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

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private setupService: CarteiraSetupService,
        private crypto: Crypto,
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });

        // activatedRoute.paramMap.subscribe(p => {
        //     if (p.get('id')) {
        //         this.objeto.id = this.crypto.decrypt(p.get('id'));
        //         let objeto = this.empresaService.createObjeto?.carteiraSetup.find(x => x.id == this.objeto.id);
        //         if (objeto) {
        //             this.objeto.carteiraSetup_Id = objeto.id;
        //             this.objeto.nome = objeto.nome;
        //             this.objeto.percentual = objeto.carteiraProdutoRel.find(x => x.id == this.objeto.id)?.percentual ?? '' as unknown as number;
        //             this.objeto.produtoTributacaoRel = objeto.carteiraProdutoRel.map(x => x.produtoTributacaoRel);
        //             setTimeout(() => {
        //                 this.modal.setOpen(true);
        //             }, 200);
        //         } else {
        //             this.voltar();
        //         }
        //     }
        // })
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
        if (urlArray.includes('empresas/cadastrar') || urlArray.includes('empresas/editar')) {
            let result = this.setupService.edit_To_Empresa_List(this.objeto);
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