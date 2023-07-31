import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faCheck, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Table } from 'src/app/utils/table';
import { MenuItems } from '../menu-items/menu-items';
import { Subscription, lastValueFrom } from 'rxjs';
import { getError } from 'src/app/utils/error';

@Component({
    selector: 'app-dados-cadastrais-create',
    templateUrl: './dados-cadastrais.component.html',
    styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent implements OnDestroy {
    faIdCard = faIdCard;
    objeto: Empresa = new Empresa;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    faCheck = faCheck;
    cnpjValid = false;
    isEditPage = false;
    url = '';
    subscription: Subscription[] = [];

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
        var empresa = this.empresaService.empresa.subscribe(res => {
            this.objeto = Object.assign(JSON.parse(JSON.stringify(res))) as Empresa;
            if (this.objeto.cnpj.toString().trim()) {
                this.objeto.cnpj = this.objeto.cnpj.toString().padStart(14, '0') as unknown as number;
            } else {
                this.objeto.cnpj = '' as unknown as number;
            }
            this.validateCnpj()
        });
        this.subscription.push(empresa);

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    setDadosCadastrais() {
        this.empresaService.setObject(this.objeto, 'setDadosCadastrais');
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

    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Dados inválidos')
            return;
        }
        this.objeto.cnpj = parseInt(this.objeto.cnpj.toString());
        if (this.url.includes('empresas/editar')) {
            lastValueFrom(this.empresaService.edit(this.objeto))
                .catch(res => this.menuItems.erro.push(getError(res)))
        }
    }

}
