import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { PerfilAcesso } from 'src/app/models/account-perfil.model';
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
    @Input() isEditPage: boolean = false;
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();

    perfil: PerfilAcesso[] = [];
    loadingPerfil = true;

    constructor(
        private dropdownService: DropdownService,
    ) {

        this.dropdownService.getPerfilAcesso().subscribe(res => {
            this.perfil = res;
            this.loadingPerfil = false;
        });
        this.dropdownService.perfilAcesso.subscribe(res => this.perfil = res);
    }

    ngOnInit(): void {
    }


    send(form: NgForm) {
        this.sendData.emit(form);
    }
}