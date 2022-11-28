import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlannerService } from 'src/app/services/planner.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-delete-planner',
  templateUrl: './delete-planner.component.html',
  styleUrls: ['./delete-planner.component.css']
})
export class DeletePlannerComponent implements OnInit {
  faTimes = faTimes;
  modalOpen = false;
  erro: any[] = [];
  loading = false;
  id: number = 0;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private toastr: ToastrService,
      private modal: ModalOpen,
      private plannerService: PlannerService,
      private crypto: Crypto
  ) {
      this.modal.getOpen().subscribe(res => {
          this.modalOpen = res;
      });

      this.activatedRoute.params.subscribe(res => {
          if (res['planner_id']) {
            this.id = this.crypto.decrypt(res['planner_id']);
          } else {
            this.voltar();
          }
      })
  }

  ngOnInit(): void {
      setTimeout(() => {
          this.modal.setOpen(true);
      }, 200);
  }

  voltar() {
    this.modal.voltar();
  }

  send() {
      this.loading = true;
      this.plannerService.delete(this.id).subscribe({
        next: res => {
            this.plannerService.getList();
            this.router.navigate(['..', '..', '..']);
            this.plannerService.setObject(new Planejamento);
        },
        error: err => {
            this.loading = false;
        }
    });
  }
}
