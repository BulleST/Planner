import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetupRequest } from 'src/app/models/carteiraSetup-produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
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
    objeto: CarteiraSetupRequest = new CarteiraSetupRequest;
    erro: any[] = [];
    loading = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
    ) {
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
            // Adicionar a empresaService.objeto
            this.empresaService.addNewSetupToEmpresa(this.objeto);


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