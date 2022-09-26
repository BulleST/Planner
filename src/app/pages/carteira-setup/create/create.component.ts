import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CarteiraRequest } from 'src/app/models/carteira-produto-rel';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarteiraProdutoRelService } from 'src/app/services/setup-rel.service';
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
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    objeto: CarteiraRequest = new CarteiraRequest;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        private setupService: CarteiraSetupService,
    ) {
        // this.setupService.setObject(new CarteiraSetup);
        this.setupService.getObject().subscribe(res => {
            this.objeto = res as CarteiraRequest;
        });
    }

    ngOnInit(): void {
    }
    
    voltar() {
        this.modal.voltar();
    }

    resetForm() {
        this.objeto = new CarteiraSetup
        this.setupService.setObject(new CarteiraSetup);
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];

        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (urlArray.includes('empresas/cadastrar')) {
            // var result = this.setupRelService.add_To_Empresa_List(this.objeto);
            // if (result){
            //     this.toastr.success('Operação concluída');
            //     this.voltar();
            // }
        } 
        else {
            if (urlArray.includes('empresas/editar')) {
            }
            console.log(this.objeto)
            // this.setupService.create(this.objeto).subscribe({
            //     next: (res) => {

            //     },
            //     error: (err) => {

            //     },
            // })
            // Enviar para a API
        }

        this.loading = false;
    }
}