import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCity, faEllipsisV, faFilter, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Cliente } from 'src/app/models/cliente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    faArrowRight = faArrowRight;
    faEllipsisV = faEllipsisV;
    faTimes = faTimes;
    faCity = faCity;
    objeto: Empresa = new Empresa;
    erro: any[] = [];
    loading = false;

    items: MenuItem[] = [
        { 
            id: '1',
            label: 'Dados Cadastrais',
            routerLink: 'dados-cadastrais',
            title: 'Oi'
        },
        { 
            id: '2',
            label: 'Usuários',
            routerLink: 'usuarios',
        },
        { 
            id: '3',
            label: 'Produtos',
            routerLink: 'produtos',
        },
        { 
            id: '4',
            label: 'Carteira Setup',
            routerLink: 'setup',
        },
        { 
            id: '5',
            label: 'Revisar dados',
            routerLink: 'finalizar',
        },
    ];
    index: number = 1;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private empresaService: EmpresaService,
    ) {
        if ( this.empresaService.objeto.value == undefined)
            this.empresaService.setObject(new Empresa);

        this.empresaService.getObject().subscribe(res => {
            this.objeto = res ?? new Empresa;
        });
    }

    ngOnInit(): void {
    }

    voltar() {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }

    send(form: NgForm) {
        this.loading = true;
        this.erro = [];
        this.empresaService.create(this.objeto);
        this.voltar();
        this.toastr.success('Operação concluída');
        this.loading = false;
    }

    
    chan() {
      this.index += 1;
    }

}
