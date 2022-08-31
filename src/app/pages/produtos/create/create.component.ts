import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
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
    objeto: Produto = new Produto;
    erro: any[] = [];
    loading = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private produtoService: ProdutoService,
        private crypto: Crypto
    ) {
        activatedRoute.paramMap.subscribe(p => {
            if (p.get('empresa_id')) { // Rota = setup/cadastrar/<empresa_id>
                this.objeto.empresa_Id = this.crypto.decrypt(p.get('empresa_id'));
            }
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
        this.modal.voltar();
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (urlArray.includes('empresas/cadastrar')) {
            let result = this.produtoService.add_To_Empresa_List(this.objeto);
            if (result)
                this.voltar();
        }else if (urlArray.includes('empresas/editar')) {
            // Enviar para a API também
        }
        else {
            // Enviar para a API
        }
        this.toastr.success('Operação concluída');
        this.loading = false;
        this.loading = false;
    }
}