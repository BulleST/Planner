import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faCheck, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';
import { MenuItems } from '../menu-items/menu-items';
import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';
import { regexCNPJ, validateCnpj } from 'src/app/utils/validate-cnpj';

@Component({
    selector: 'app-dados-cadastrais-create',
    templateUrl: './dados-cadastrais.component.html',
    styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent implements OnDestroy, AfterViewInit {
    faIdCard = faIdCard;
    objeto: Empresa = new Empresa;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    faCheck = faCheck;
    isEditPage = false;
    url = '';
    subscription: Subscription[] = [];

    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    @ViewChild('cnpj') cnpjModel: NgModel;
    regexCNPJ = regexCNPJ;
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private table: Table,
        public menuItems: MenuItems,
    ) {
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (this.url.includes('empresas/editar')) {
            this.isEditPage = true;
        } else {
            this.isEditPage = false;
        }
    }
    ngAfterViewInit(): void {
            var empresa = this.empresaService.empresa.subscribe(res => {
                this.objeto = Object.assign(JSON.parse(JSON.stringify(res))) as Empresa;
                if (this.objeto.cnpj.toString().trim()) {
                    this.objeto.cnpj = this.objeto.cnpj.toString().padStart(14, '0') as unknown as number;
                } else {
                    this.objeto.cnpj = '' as unknown as number;
                }
                this.validateCnpj(this.cnpjModel)
            });
            this.subscription.push(empresa);
        
    }
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    setDadosCadastrais() {
        this.empresaService.setObject(this.objeto, 'setDadosCadastrais');
    }

    validateCnpj(cnpj: NgModel) {
        var valid = validateCnpj(this.objeto.cnpj);
        if (!valid) {
            cnpj.control.setErrors({invalid: true})
        } else {
            cnpj.control.setErrors(null);
        }
        return valid;
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

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Dados inválidos')
            return;
        }
        this.objeto.cnpj = parseInt(this.objeto.cnpj.toString());
        if (this.objeto.id == 0 && this.url.includes('empresas/cadastrar')) {
            lastValueFrom(this.empresaService.create(this.objeto))
                .catch(res => this.menuItems.erro.push(getError(res)))
        } else {
            lastValueFrom(this.empresaService.edit(this.objeto))
                .catch(res => this.menuItems.erro.push(getError(res)))
        }
    }

}

