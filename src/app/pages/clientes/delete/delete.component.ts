import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
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
        private clienteService: ClienteService,
        private crypto: Crypto
    ) {
        this.modal.getOpen().subscribe(res => {
            this.modalOpen = res;
        });
  
        this.activatedRoute.params.subscribe(res => {
            if (res['cliente_id']) {
              this.id = this.crypto.decrypt(res['cliente_id']);
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
        this.clienteService.delete(this.id).subscribe({
          next: async res => {
              await lastValueFrom(this.clienteService.getList())
              this.voltar();
              this.clienteService.setObject(new Cliente);
          },
          error: err => {
              this.loading = false;
          }
      });
    }
  }
  