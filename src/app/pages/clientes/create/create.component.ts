import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes, faWallet } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
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
    cliente: Cliente = new Cliente;
    erro: any[] = [];
    loading = false;
    loadingProduto = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modal: ModalOpen,
        private clienteService: ClienteService,
        private toastr: ToastrService,
    ) {
        
        this.clienteService.getObject().subscribe(res => {
            this.cliente = res as Cliente;
        });
    }

    ngOnInit(): void {
    }
    
    voltar() {
        this.modal.voltar();
    }

    resetForm() {
        this.cliente = new Cliente;
        this.clienteService.setObject(new Cliente);
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];

            this.clienteService.create(this.cliente).subscribe({
                next: async (res) => {
                    await lastValueFrom(this.clienteService.getList())
                    this.loading = false;
                    this.voltar();
                },
                error: (err) => {
                    this.loading = false;
                },
            })
    }
}