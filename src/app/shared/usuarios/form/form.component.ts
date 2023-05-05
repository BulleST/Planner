import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, lastValueFrom } from 'rxjs';
import { PerfilAcesso } from 'src/app/models/account-perfil.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DropdownService } from 'src/app/services/dropdown.service';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormUsuarioComponent implements OnDestroy {
    @Input() objeto: Usuario = new Usuario;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Input() isEditPage: boolean = false;
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();

    perfil: PerfilAcesso[] = [];
    loadingPerfil = true;
    subscription: Subscription[] = [];


    constructor(
        private dropdownService: DropdownService,
    ) {

        lastValueFrom(this.dropdownService.getPerfilAcesso())
            .then(res => this.perfil = res)
            .catch()
            .finally(() => this.loadingPerfil = false);

        var perfilAcesso = this.dropdownService.perfilAcesso.subscribe(res => this.perfil = res);
        this.subscription.push(perfilAcesso);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    send(form: NgForm) {
        this.sendData.emit(form);
    }
}