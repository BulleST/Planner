import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-create-usuario-form',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateUsuarioComponent implements OnInit {
    @Input() objeto: Usuario = new Usuario;
    @Input() loading = false;
    @Input() erro: any[] = [];

    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private crypto: Crypto,
        private modal: ModalOpen
    ) {
        
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
    }

    voltar() {
        this.modal.setOpen(false);
        setTimeout(() => {
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        }, 200);
    }

    send(form: NgForm) {
        this.sendData.emit(form);
    }
}