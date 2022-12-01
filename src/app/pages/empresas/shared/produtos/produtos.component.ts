import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faHandHoldingDollar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Empresa } from 'src/app/models/empresa.model';
import { produtoColumns } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-produtos-create',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.css']
  })
export class ProdutosComponent implements OnInit {
    faHandHoldingDollar = faHandHoldingDollar;
    objeto: Empresa = new Empresa;
    produtoColumns = produtoColumns;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    tableLinks: MenuTableLink[] = [];
    
    constructor(
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = res;
        });

        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
            { label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] },
        ]
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['..', 'setup'], { relativeTo: this.activatedRoute })
    }
    
    previous() {
        this.router.navigate(['..', 'clientes'], { relativeTo: this.activatedRoute })
    }

}
