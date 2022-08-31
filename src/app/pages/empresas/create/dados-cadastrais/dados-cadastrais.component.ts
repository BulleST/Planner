import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa, EmpresaCreateRequest } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-dados-cadastrais-create',
    templateUrl: './dados-cadastrais.component.html',
    styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent implements OnInit {
    faIdCard = faIdCard;
    objeto: EmpresaCreateRequest = new EmpresaCreateRequest;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router
    ) { 
        this.empresaService.createEmpresaObject.subscribe(res => {
            this.objeto = Object.assign(JSON.parse(JSON.stringify(res))) ?? new EmpresaCreateRequest;
            this.objeto.cnpj = this.objeto.cnpj.toString().padStart(14, '0') as unknown as number;
        });
    }

    ngOnInit(): void {
    }

    next(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Dados inválidos')
            return;
        }
        this.objeto.cnpj = parseInt(this.objeto.cnpj.toString())
        this.empresaService.setCreateObject(this.objeto);
        this.router.navigate(['empresas', 'cadastrar', 'usuarios'])

    }

}
