import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PercentualRisco } from 'src/app/models/percentual-risco.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PercentualRiscoService } from 'src/app/services/percentual-risco.service';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    faTimes = faTimes;
    modalOpen = false;
    objeto: PercentualRisco = new PercentualRisco;
    erro: any[] = [];
    loading = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modal: ModalOpen,
        private empresaService: EmpresaService,
        private riscoService: PercentualRiscoService,
        private crypto: Crypto
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
        if (urlArray.includes('empresas/cadastrar') || urlArray.includes('empresas/editar')) {
            let result = this.riscoService.edit_To_Empresa_List(this.objeto); 
            if (result)
                this.voltar();
        }
        else {
            // Enviar para a API
            this.toastr.success('Operação concluída');
        }

        this.loading = false;
        this.voltar();
    }
}