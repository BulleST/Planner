import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
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
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private crypto: Crypto
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });


        this.activatedRoute.params.subscribe(res => {
            if (res['id']) {
                this.objeto.id = this.crypto.decrypt(res['id']);
                // this.empresaService.get(this.objeto.id).subscribe({
                // 	next: (res:string|Empresa) => {

                // 	}
                // })
            }
        })
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
            // Adicionar a empresaService.objeto
            this.empresaService.addNewProdutoToEmpresa(this.objeto);


        } else if (urlArray.includes('empresas/editar')) {
            // Adicionar a empresaService.objeto
        }
        else {
            // Enviar para a API
            this.toastr.success('Operação concluída');
        }

        this.loading = false;
        this.voltar();
    }
}