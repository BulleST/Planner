import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-dados-cadastrais-edit',
    templateUrl: './dados-cadastrais.component.html',
    styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent implements OnInit {
    faIdCard = faIdCard;
    objeto: Empresa = new Empresa;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    erro: any[] = [];
    loading = false;

    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router
    ) {
        this.empresaService.objeto.subscribe(res => {
            this.objeto = res ?? new Empresa;
        });
    }

    ngOnInit(): void {
    }

    next(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Dados inválidos')
            return;
        }
        this.empresaService.setObject(this.objeto);
    }

}
