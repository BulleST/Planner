import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { PlannerService } from 'src/app/services/planner.service';
import { IsMobile } from 'src/app/utils/mobile';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
    faTimes = faTimes;
    faWallet = faWallet;
    faChevronLeft = faChevronLeft;
    modalOpen = false;
    planner: Planejamento = new Planejamento;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;
    mobile = false;

    constructor(
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private isMobile: IsMobile,
    ) {
        this.plannerService.getObject().subscribe(res => {
            this.planner = res;
        });
    }

    ngOnInit(): void {
    }
    
    voltar() {
        this.modal.voltar();
    }

    resetForm() {
        this.plannerService.setObject(new Planejamento);

    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];

            this.plannerService.create(this.planner).subscribe({
                next: async (res) => {
                    await lastValueFrom(this.plannerService.getList())
                    this.loading = false;
                    this.voltar();
                },
                error: (err) => {
                    this.loading = false;
                },
            })
    }
}