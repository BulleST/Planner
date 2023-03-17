import { Component, Host, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faCheck, faPercent } from '@fortawesome/free-solid-svg-icons';
import { MaskApplierService } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { PerfilAcesso } from 'src/app/models/account-perfil.model';
import { Empresa, EmpresaRequest } from 'src/app/models/empresa.model';
import { percentualRiscoColumns } from 'src/app/models/percentual-risco.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { CreateComponent } from '../../create/create.component';
import { EditComponent } from '../../edit/edit.component';

@Component({
    selector: 'app-percentual-risco-create',
    templateUrl: './percentual-risco.component.html',
    styleUrls: ['./percentual-risco.component.css']
})
export class PercentualRiscoComponent implements OnInit {
    faPercent = faPercent;
    faArrowLeft = faArrowLeft;
    faCheck = faCheck;
    objeto: Empresa = new Empresa;
    percentualRiscoColumns = percentualRiscoColumns;
    tableLinks: MenuTableLink[] = [];
    erro: any[] = [];
    loading = false;
    url = '';
    isEditPage = false;

    constructor(
        private toastr: ToastrService,
        private empresaService: EmpresaService,
        private router: Router,
        private mask: MaskApplierService,
        private activatedRoute: ActivatedRoute,
        private crypto: Crypto,
    ) {
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');

        this.empresaService.empresaObject.subscribe(res => {
            this.objeto = Object.assign(res);
        });

        this.tableLinks = [
            { label: 'Editar', routePath: [ 'editar'], paramsFieldName: ['id'] },
            { label: 'Excluir', routePath: [ 'excluir'], paramsFieldName: ['id'] },
        ];
        
        if (this.url.includes('empresas/editar')) {
            this.isEditPage = true;
        } else {
            this.isEditPage = false;
        }
    }

    ngOnInit(): void { }

    next() {
        this.loading = true;
        this.erro = [];
        if (!this.objeto.nome.trim() || !this.objeto.cnpj.toString().trim() || !this.objeto.cnpj ||!this.objeto.email.trim()) {
            this.loading = false;
            this.erro.push('Dados cadastrais inválidos.');
            this.toastr.error('Dados cadastrais inválidos.');
            return;
        }
        let obj = Object.assign({}, JSON.parse(JSON.stringify(this.objeto))) as Empresa; 

        // Atribuindo apenas os produtos que não estão
        // em uma carteira setup para não ser salvo duplicado
        // let produtosCarteiraSetup = obj.carteiraSetup.flatMap(x => x.carteiraProdutoRel).map(x => x.produtoTributacaoRel.produto)
        let produtosCarteiraSetup = obj.carteiraSetup.flatMap(x => x.carteiraProdutoRel).map(x => x.produto)
        let produtosCarteiraSetupId = produtosCarteiraSetup.map(x => x.id);
        let produtos = obj.produto.filter(x => !produtosCarteiraSetupId.includes(x.id))
        
        obj.produto = produtos.map(x => {
            delete x.empresa;
            if (x.registroNaoSalvo) {
                x.id = 0; // removendo o id adicionado pelo front daqueles que não foram salvos no db
            }
            return x
        });

        obj.carteiraSetup.map(x => {
            if (x.registroNaoSalvo) {
                x.id = 0; // removendo o id adicionado pelo front daqueles que não foram salvos no db
            }
            x.carteiraProdutoRel.map(rel => {
                if (x.registroNaoSalvo) {
                    // removendo o id adicionado pelo front daqueles que não foram salvos no db
                    rel.carteiraSetup_Id = 0; 
                }
                return rel
            })
            return x;
        });

        obj.cliente.filter(x => x.registroNaoSalvo).map(x => {
            x.id = 0;
            delete x.estadoCivil;
            delete x.perfilInvestidor;
            return x;
        });
        obj.account.filter(x => x.registroNaoSalvo).map(x => {
            x.id = 0;
            x.perfilAcesso = undefined as unknown as PerfilAcesso;
            return x;
        });
        obj.percentualRisco.filter(x => x.registroNaoSalvo).map(x => {
            x.id = 0;
            delete x.perfilInvestidor;
            x.capacidadeRisco_Id = 0;
            return x;
        });

        if (this.url.includes('empresas/cadastrar')) {
            this.empresaService.create(obj).subscribe({
                next: async res => {
                    await lastValueFrom(this.empresaService.getList());
                    this.router.navigate(['empresas', 'editar', this.crypto.encrypt(res.id)]);
                    this.loading = false;
                }, 
                error: err => {
                    this.loading = false;
                    this.erro.push(err.error.message)
                }
            });
        }
        else if (this.url.includes('empresas/editar')) { // Enviar para a API
            this.empresaService.edit(obj).subscribe({
                next: async res => {
                    await lastValueFrom(this.empresaService.getList());
                    this.router.navigate(['empresas', 'editar', this.crypto.encrypt(res.id)]);
                    this.loading = false;
                }, 
                error: err => {
                    this.loading = false;
                    this.erro.push(err.error.message)
                }
            });
        }



    }
    
    previous() {
        this.router.navigate(['..', 'setup'], { relativeTo: this.activatedRoute })
    }

}
