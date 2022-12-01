import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { CarteiraSetupService } from 'src/app/services/setup.service';
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
    objeto: CarteiraSetup = new CarteiraSetup;
    erro: any[] = [];
    loading = false;
    url = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        private setupService: CarteiraSetupService,
        private toastr: ToastrService,
    ) {
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        
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
        if (this.url.includes('empresas/cadastrar')) {
            let result = this.setupService.add_To_Empresa_List(this.objeto);
            if (result) {
                this.toastr.success('Operação concluída');
                this.voltar();
            }
            this.loading = false;
        }
        else { // Enviar para a API
            if (this.url.includes('empresas/editar')) {
            }
            this.setupService.create(this.objeto).subscribe({
                next: (res) => {
                    this.modal.voltar();
                    this.setupService.getList().subscribe();
                },
                error: (error) => {
                    this.loading = false;
                },
            });
        }
    }
}