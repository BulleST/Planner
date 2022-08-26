import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { DropdownService } from './dropdown.service';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';
import { CarteiraProdutoRel, CarteiraSetupRelRequest } from '../models/carteiraSetup-produto.model';
import { CarteiraSetup } from '../models/carteiraSetup.model';
import { AlertService } from '../parts/alert/alert.service';

@Injectable({
    providedIn: 'root'
})
export class CarteiraSetupService {
    url = environment.url;
    list = new BehaviorSubject<CarteiraSetup[]>([]);
    objeto = new BehaviorSubject<CarteiraSetupRelRequest | undefined>(undefined);
    carteiraSetup = new BehaviorSubject<CarteiraSetup[]>([]);
    empresa?= new Empresa;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private dropdownService: DropdownService,
        private empresaService: EmpresaService,
        private alert: AlertService
    ) {
        this.empresaService.empresa.subscribe(res => {
            this.empresa = res;
        });
    }

    getObject() {
        let e = localStorage.getItem('setup')
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new CarteiraSetupRelRequest)
        }
        return this.objeto;
    }

    setObject(value: CarteiraSetupRelRequest) {
        localStorage.setItem('setup', this.crypto.encrypt(value) ?? '')
        this.setObject(value);
    }

    add_To_Empresa_List(item: CarteiraSetupRelRequest) {
        if (item.produtoTributacaoRel.length == 0) {
            this.toastr.error('Insira pelo menos uma combinação de produto e tributação.');
            return false;
        }
        if (this.empresa) {
            let setupRels = this.empresa.carteiraSetup ?? [];
            setupRels.sort((x, y) => x.id - y.id);

            let lastId = 0;

            // Setando CarteiraSetup
            let carteiraSetup = this.dropdownService.carteiraSetup.value.find(x => x.id == item.carteiraSetup_Id);
            if (!carteiraSetup) {
                lastId = setupRels.length == 0 ? 0 : setupRels[setupRels.length - 1].id;
                carteiraSetup = {
                    id: ++lastId,
                    nome: item.nome ?? '',
                    carteiraProdutoRel: [],
                    empresa_Id: this.empresa.id,
                };
                var list = this.dropdownService.carteiraSetup.value;
                list.push(carteiraSetup);
                this.dropdownService.carteiraSetup.next(list);
            }
            var mensagemErro = ``;
            var rels: CarteiraProdutoRel[] = carteiraSetup.carteiraProdutoRel;

            // Setando principal objeto Carteira Produto Rel para cada ProdutoTributacaoRel
            for(let produtoTributacaoRel of item.produtoTributacaoRel) {

                // Validando se já existe outro igual
                let o = this.empresa.carteiraSetup.find(x => {
                    var mesmaCarteira = carteiraSetup?.nome == x.nome || carteiraSetup?.id == x.id;
                    var mesmoProdutoTributacaoRel = x.carteiraProdutoRel
                                            .filter(x => x.produtoTributacaoRel.produto_Id == produtoTributacaoRel.produto_Id
                                                && x.produtoTributacaoRel.tributacao_Id == produtoTributacaoRel.tributacao_Id);
                   

                    return mesmaCarteira && mesmoProdutoTributacaoRel;
                });

                if (o) {
                    var mensagemErro = `<div class="mt-2">
                                        <p><strong>Carteira: </strong> ${carteiraSetup.nome}</p>
                                        <p><strong>Produto: </strong> ${produtoTributacaoRel.produto.descricao}</p>
                                        <p><strong>tributação: </strong>${produtoTributacaoRel.tributacao.descricao}</p>
                                        <hr>
                                    </div>`;
                } else {
                    this.empresa.carteiraSetup.sort((x,y) => x.id - y.id)
                    var arrays = this.empresa.carteiraSetup.map(x => x.carteiraProdutoRel)
                    var relsList = [].concat.apply([], arrays as unknown as ConcatArray<never>[]) as CarteiraProdutoRel[];
                    lastId = relsList.length == 0 ? 0 : relsList[relsList.length - 1].id;
                    let carteiraProdutoRel: CarteiraProdutoRel = {
                        id: ++lastId,
                        carteiraSetup_Id: carteiraSetup.id,
                        carteiraSetup: undefined,
                        percentual: item.percentual,
                        produtoTributacao_Id: produtoTributacaoRel.id,
                        produtoTributacaoRel: produtoTributacaoRel,
                    }
                    rels.push(carteiraProdutoRel);
                }
            }

            if (mensagemErro.trim() != '') {
                this.alert.warn(`  
                    <p><strong>Atenção</strong></p>
                    <p>Os seguintes itens não foram adicionados como um setup pois já existe cadastrado</p>
                    ${mensagemErro}
                `);
            }
            
            carteiraSetup.carteiraProdutoRel = rels;
            
            this.empresa.carteiraSetup.push(carteiraSetup);

            // Removendo Dependencia circular na estrutura do JSON
            this.empresa.carteiraSetup.map(carteira => {
                return carteira.carteiraProdutoRel.map(rel => {
                    delete rel.carteiraSetup
                    return rel
                })
            });


            this.empresaService.setObject(this.empresa);
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    edit_To_Empresa_List(item: CarteiraSetupRelRequest) {
        if (item.produtoTributacaoRel.length == 0) {
            this.toastr.error('Insira pelo menos uma combinação de produto e tributação.');
            return false;
        }
        if (this.empresa) {
            let setupRels = this.empresa.carteiraSetup ?? [];
            setupRels.sort((x, y) => x.id - y.id);

            let lastId = 0;

            // Setando CarteiraSetup
            let carteiraSetup = this.dropdownService.carteiraSetup.value.find(x => x.id == item.carteiraSetup.id);
            if (!carteiraSetup) {
                lastId = setupRels.length == 0 ? 0 : setupRels[setupRels.length - 1].id;
                carteiraSetup = {
                    id: ++lastId,
                    nome: item.nome ?? '',
                    carteiraProdutoRel: [],
                    empresa_Id: this.empresa.id,
                };
            }
            var mensagemErro = ``;
            var rels: CarteiraProdutoRel[] = carteiraSetup.carteiraProdutoRel;

            // Setando principal objeto Carteira Produto Rel para cada ProdutoTributacaoRel
            for(let produtoTributacaoRel of item.produtoTributacaoRel) {

                // Validando se já existe outro igual
                let o = this.empresa.carteiraSetup.find(x => {
                    var mesmaCarteira = carteiraSetup?.nome == x.nome || carteiraSetup?.id == x.id;
                    var mesmoProdutoTributacaoRel = x.carteiraProdutoRel
                                            .filter(x => x.produtoTributacaoRel.produto_Id == produtoTributacaoRel.produto_Id
                                                && x.produtoTributacaoRel.tributacao_Id == produtoTributacaoRel.tributacao_Id);
                   

                    return mesmaCarteira && mesmoProdutoTributacaoRel;
                });

                if (o) {
                    var mensagemErro = `<div class="mt-2">
                                        <p><strong>Carteira: </strong> ${carteiraSetup.nome}</p>
                                        <p><strong>Produto: </strong> ${produtoTributacaoRel.produto.descricao}</p>
                                        <p><strong>tributação: </strong>${produtoTributacaoRel.tributacao.descricao}</p>
                                        <hr>
                                    </div>`;
                } else {
                    lastId = rels.length == 0 ? 0 : rels[rels.length - 1].id;
                    let carteiraProdutoRel: CarteiraProdutoRel = {
                        id: ++lastId,
                        carteiraSetup_Id: carteiraSetup.id,
                        carteiraSetup: carteiraSetup,
                        percentual: item.percentual,
                        produtoTributacao_Id: produtoTributacaoRel.id,
                        produtoTributacaoRel: produtoTributacaoRel,
                    }
                    rels.push(carteiraProdutoRel);
                }
            }

            if (mensagemErro.trim() != '') {
                this.alert.warn(`  
                    <p><strong>Atenção</strong></p>
                    <p>Os seguintes itens não foram adicionados como um setup pois já existe cadastrado</p>
                    ${mensagemErro}
                `);
            }
            
            carteiraSetup.carteiraProdutoRel = rels;
            
            this.empresa.carteiraSetup.push(carteiraSetup);
            this.empresaService.setObject(this.empresa);
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }
    
    delete_To_Empresa_List(id: number) {
        if (this.empresa) {
            let list = this.empresa.carteiraSetup ?? [];
            let index = list.findIndex(x => x.id == id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresa.carteiraSetup = list;
                this.empresaService.setObject(this.empresa);
                this.toastr.success('Operação concluída');
                this.table.resetSelection();
                return true;
            } else {
                this.toastr.error('Usuário não encontrado!!');
                return false;
            }
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }


   
    getList() {
        let empresa_Id = this.empresaService.objeto?.id ?? 1;
        return this.http.get<CarteiraSetup[]>(`${this.url}/carteiraSetup/all/${empresa_Id}`).pipe(
            map(list => {
                this.list.next(list);
                this.empresa!.carteiraSetup! = list;
                this.empresaService.setObject(this.empresa);
                return list;
            })
        );
    }


    get(id: number){
    }

    create(request: CarteiraSetupRelRequest) {
    }

    edit(request: CarteiraSetupRelRequest) {
    }

    delete(model: CarteiraSetupRelRequest) {
    }

}
