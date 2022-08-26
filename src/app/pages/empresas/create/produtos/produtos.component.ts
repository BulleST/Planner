import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faHandHoldingDollar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa.model';
import { produtoColumns } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';

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
    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router
    ) {
        this.empresaService.empresa.subscribe(res => {
            this.objeto = res ?? new Empresa;
        });
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['empresas', 'cadastrar', 'setup'])
    }
    
    previous() {
        this.router.navigate(['empresas', 'cadastrar', 'usuarios'])
    }

}
