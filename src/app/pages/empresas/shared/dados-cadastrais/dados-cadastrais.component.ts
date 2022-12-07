import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm, NgModel } from '@angular/forms';
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
export class DadosCadastraisComponent implements OnInit, AfterViewInit {
    faIdCard = faIdCard;
    objeto: Empresa = new Empresa;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    cnpjValid = false;

    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = Object.assign(JSON.parse(JSON.stringify(res))) as Empresa;
            if (this.objeto.cnpj.toString().trim()) {
                this.objeto.cnpj = this.objeto.cnpj.toString().padStart(14, '0') as unknown as number;
            } else {
                this.objeto.cnpj = '' as unknown as number;
            }
            this.validateCnpj()
        });
        let url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path ?? null).filter(x => !!x).join('/')

    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    setDadosCadastrais() {
        this.empresaService.setObject(this.objeto);
    }

    validateCnpj() {
        if (this.objeto.cnpj.toString().length != 14) {
            return this.cnpjValid = false;
        }
        if (parseInt(this.objeto.cnpj.toString()) == 0) {
            return this.cnpjValid = false;
        }
        return this.cnpjValid = true;
    }

    next(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Dados inválidos')
            return;
        }
        this.objeto.cnpj = parseInt(this.objeto.cnpj.toString())
        this.setDadosCadastrais();
        this.router.navigate(['..', 'usuarios'], { relativeTo: this.activatedRoute })
    }

}
