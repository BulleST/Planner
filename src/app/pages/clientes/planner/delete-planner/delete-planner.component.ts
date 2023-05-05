import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlannerService } from 'src/app/services/planner.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-delete-planner',
    templateUrl: './delete-planner.component.html',
    styleUrls: ['./delete-planner.component.css']
})
export class DeletePlannerComponent implements OnDestroy {
    faTimes = faTimes;
    modalOpen = false;
    erro: any[] = [];
    loading = false;
    id: number = 0;
    subscription: Subscription[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        private plannerService: PlannerService,
        private crypto: Crypto
    ) {
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
        this.subscription.push(getOpen);

        var params = this.activatedRoute.params.subscribe(res => {
            if (res['planner_id']) {
                this.id = this.crypto.decrypt(res['planner_id']);
            } else {
                this.voltar();
            }
        })
        this.subscription.push(params);
        setTimeout(() => {
            this.modal.setOpen(true);
        }, 200);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    voltar() {
        this.modal.voltar();
    }

    send() {
        this.loading = true;
        lastValueFrom(this.plannerService.delete(this.id))
            .then(res => {
                lastValueFrom(this.plannerService.getList());
                this.router.navigate(['..', '..', '..']);
                this.plannerService.setObject(new Planejamento);
            })
            .finally(() => this.loading = false);

    }
}
