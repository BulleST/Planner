import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Empresa } from 'src/app/models/empresa.model';
import { Produto, produtoColumns } from 'src/app/models/produto.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-produtos-create',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.css']
  })
export class ProdutosComponent implements OnInit {
    faHandHoldingDollar = faHandHoldingDollar;
    faArrowLeft = faArrowLeft;
    faArrowRight = faArrowRight;
    
    objeto: Empresa = new Empresa;
    columns = produtoColumns;
    tableLinks: MenuTableLink[] = [];
    
    constructor(
        private empresaService: EmpresaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private produtoService: ProdutoService,
        private table: Table,
    ) {
        this.empresaService.empresa.subscribe(res => {
            this.objeto = res;
        });
        
        var url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (!url.includes('empresas/editar')) {
            this.columns = this.columns.filter(x => x.field != 'ativo');
        }
        
        this.table.selected.subscribe(res => {
            this.tableLinks = [];
            if (res) { // se tiver linha selecionada
                this.tableLinks.push({ label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] });
                if (!res.registroNaoSalvo) {
                    this.tableLinks.push({ label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [ (res.ativo ? 'desabilitar' : 'habilitar') ], paramsFieldName: ['id'] });
                } else {
                    this.tableLinks.push({ label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] })
                }
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(['..', 'setup'], { relativeTo: this.activatedRoute })
    }
    
    previous() {
        this.router.navigate(['..', 'clientes'], { relativeTo: this.activatedRoute })
    }
    create = (produtoService: ProdutoService = this.produtoService): void => {
        produtoService.setObject(new Produto);
    }

}
