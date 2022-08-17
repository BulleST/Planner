import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { PerfilAcesso } from 'src/app/models/usuario-perfil.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormUsuarioComponent implements OnInit {
    @Input() objeto: Usuario = new Usuario;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();

    perfil: PerfilAcesso[] = [];
    loadingPerfil = true;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private crypto: Crypto,
        private modal: ModalOpen,
        private dropdownService: DropdownService,
    ) {

        this.dropdownService.getPerfilAcesso().subscribe(res => {
            this.perfil = res;
            this.loadingPerfil = false;
        });
        this.dropdownService.perfilAcesso.subscribe(res => this.perfil = res);

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