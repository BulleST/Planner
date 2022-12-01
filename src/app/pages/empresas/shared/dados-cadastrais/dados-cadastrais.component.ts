import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-dados-cadastrais-create',
    templateUrl: './dados-cadastrais.component.html',
    styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent implements OnInit {
    faIdCard = faIdCard;
    objeto: Empresa = new Empresa;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { 
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = Object.assign(JSON.parse(JSON.stringify(res))) as Empresa;
            this.objeto.cnpj = this.objeto.cnpj.toString().padStart(14, '0') as unknown as number;
        });
        let url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path ?? null).filter(x => !!x).join('/')
            
    }

    ngOnInit(): void {
    }

    next(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Dados inválidos')
            return;
        }

        this.objeto.cnpj = parseInt(this.objeto.cnpj.toString())
        this.empresaService.setObject(this.objeto);

        this.router.navigate(['..', 'usuarios'], { relativeTo: this.activatedRoute })
    }

}
