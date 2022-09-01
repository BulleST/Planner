import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { DropdownService } from './dropdown.service';
import { Empresa, EmpresaCreateRequest } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';
import { CarteiraProdutoRel, CarteiraProdutoRequest, CarteiraSetupRelRequest } from '../models/carteiraSetup-produto.model';
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
    empresaCreateRequest? = new EmpresaCreateRequest;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private dropdownService: DropdownService,
        private empresaService: EmpresaService,
        private alert: AlertService
    ) {
        this.empresaService.createEmpresaObject.subscribe(res => {
            this.empresaCreateRequest = res;
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

    /*add_To_Empresa_List(item: CarteiraSetupRelRequest) {
        if (item.produtoTributacaoRel.length == 0) {
            this.toastr.error('Insira pelo menos uma combinação entre produto e tributação.');
            return false;
        }
        if (this.empresaCreateRequest) {
            let carteiras_Setup = this.empresaService.createObjeto?.carteiraSetup ?? [];
            carteiras_Setup.sort((x, y) => x.id - y.id);
            let lastId = 0;
            
            // Setando CarteiraSetup
            let carteira_Setup = this.dropdownService.carteiraSetup.value.find(x => x.id == item.carteiraSetup_Id);
            if (!carteira_Setup) {
                lastId = carteiras_Setup.length == 0 ? 0 : carteiras_Setup[carteiras_Setup.length - 1].id;
                carteira_Setup = {
                    id: ++lastId,
                    nome: item.carteiraSetup ?? '',
                    empresa_Id: item.empresa_Id,
                    carteiraProdutoRel: []
                };
                var list = this.dropdownService.carteiraSetupEmpresaCreation.value;
                list.push(carteira_Setup);
                this.dropdownService.carteiraSetupEmpresaCreation.next(list);
            }
            let mensagemErro = ``;

            
            for (let produtoTributacaoRel of item.produtoTributacaoRel) {
                let validacao = this.empresaCreateRequest.carteiraSetup.find(x => {
                    var mesmaCarteira = x.carteiraSetup.toLowerCase() == item.carteiraSetup.toLowerCase() 
                                                && x.carteiraSetup_Id == item.carteiraSetup_Id;
                    var mesmoProdutoTributacaoRel = item.produtoTributacaoRel.filter(y => y.produto_Id == x.produto_Id 
                                                                                        && y.tributacao_Id== x.tributacao_Id)
                    return mesmaCarteira && mesmoProdutoTributacaoRel;
                });
                if (validacao) {
                    mensagemErro = `<div class="mt-2">
                        <p><strong>Carteira: </strong> ${carteira_Setup.nome}</p>
                        <p><strong>Produto: </strong> ${produtoTributacaoRel.produto}</p>
                        <p><strong>Tributação: </strong>${produtoTributacaoRel.tributacao}</p>
                        <p><strong>Alíquota: </strong>${produtoTributacaoRel.aliquota}%</p>
                        <hr>
                    </div>`;
                } else {
                    let carteiraProdutoRel: CarteiraProdutoRequest = {
                        id: ++lastId,
                        empresa_Id: carteira_Setup.empresa_Id,
                        carteiraSetup: carteira_Setup.nome,
                        carteiraSetup_Id: carteira_Setup.id,
                        percentual: item.percentual,
                        produto: produtoTributacaoRel.produto,
                        produto_Id: produtoTributacaoRel.produto_Id,
                        tributacao: produtoTributacaoRel.tributacao,
                        tributacao_Id: produtoTributacaoRel.tributacao_Id,
                        aliquota: produtoTributacaoRel.aliquota,
                    }
                    this.empresaCreateRequest.carteiraSetup.push(carteiraProdutoRel);
                }
            }

            this.empresaService.setCreateObject(this.empresaCreateRequest);
            if (mensagemErro.trim() != '') {
                this.alert.warn(`  
                    <p><strong>Atenção</strong></p>
                    <p>Os seguintes itens não foram adicionados como um setup pois já estão cadastrados.</p>
                    <p>Obs.: os outros registros não citados foram salvos!</p>
                    ${mensagemErro}
                `);
            } else {
                this.toastr.success('Operação concluída');
            }

            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }
    */
    add_To_Empresa_List(item: CarteiraSetupRelRequest) {
        if (item.produtoTributacaoRel.length == 0) {
            this.toastr.error('Insira pelo menos uma combinação entre produto e tributação.');
            return false;
        }
        if (this.empresaCreateRequest) {
            let carteiras_Setup = this.empresaService.createObjeto?.carteiraSetup ?? [];
            carteiras_Setup.sort((x, y) => x.id - y.id);
            let lastId = 0;
            
            // Setando CarteiraSetup
            let carteira_Setup = this.dropdownService.carteiraSetup.value.find(x => x.id == item.carteiraSetup_Id);
            if (!carteira_Setup) {
                lastId = carteiras_Setup.length == 0 ? 0 : carteiras_Setup[carteiras_Setup.length - 1].id;
                carteira_Setup = {
                    id: ++lastId,
                    nome: item.carteiraSetup ?? '',
                    empresa_Id: item.empresa_Id,
                    carteiraProdutoRel: []
                };
                var list = this.dropdownService.carteiraSetupEmpresaCreation.value;
                list.push(carteira_Setup);
                this.dropdownService.carteiraSetupEmpresaCreation.next(list);
            }
            let mensagemErro = ``;

            
            for (let produtoTributacaoRel of item.produtoTributacaoRel) {
                let validacao = this.empresaCreateRequest.carteiraSetup.find(x => {
                    var mesmaCarteira = x.carteiraSetup.toLowerCase() == item.carteiraSetup.toLowerCase() 
                                                && x.carteiraSetup_Id == item.carteiraSetup_Id;
                    var mesmoProdutoTributacaoRel = item.produtoTributacaoRel.filter(y => y.produto_Id == x.produto_Id 
                                                                                        && y.tributacao_Id== x.tributacao_Id)
                    return mesmaCarteira && mesmoProdutoTributacaoRel;
                });
                if (validacao) {
                    mensagemErro = `<div class="mt-2">
                        <p><strong>Carteira: </strong> ${carteira_Setup.nome}</p>
                        <p><strong>Produto: </strong> ${produtoTributacaoRel.produto}</p>
                        <p><strong>Tributação: </strong>${produtoTributacaoRel.tributacao}</p>
                        <p><strong>Alíquota: </strong>${produtoTributacaoRel.aliquota}%</p>
                        <hr>
                    </div>`;
                } else {
                    let carteiraProdutoRel: CarteiraProdutoRequest = {
                        id: ++lastId,
                        empresa_Id: carteira_Setup.empresa_Id,
                        carteiraSetup: carteira_Setup.nome,
                        carteiraSetup_Id: carteira_Setup.id,
                        percentual: item.percentual,
                        produto: produtoTributacaoRel.produto,
                        produto_Id: produtoTributacaoRel.produto_Id,
                        tributacao: produtoTributacaoRel.tributacao,
                        tributacao_Id: produtoTributacaoRel.tributacao_Id,
                        aliquota: produtoTributacaoRel.aliquota,
                    }
                    this.empresaCreateRequest.carteiraSetup.push(carteiraProdutoRel);
                }
            }

            this.empresaService.setCreateObject(this.empresaCreateRequest);
            if (mensagemErro.trim() != '') {
                this.alert.warn(`  
                    <p><strong>Atenção</strong></p>
                    <p>Os seguintes itens não foram adicionados como um setup pois já estão cadastrados.</p>
                    <p>Obs.: os outros registros não citados foram salvos!</p>
                    ${mensagemErro}
                `);
            } else {
                this.toastr.success('Operação concluída');
            }

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
        if (this.empresaCreateRequest) {
            let setupRels = this.empresaCreateRequest.carteiraSetup ?? [];
            setupRels.sort((x, y) => x.id - y.id);

            let lastId = 0;

            // Setando CarteiraSetup
            let carteiraSetup = this.dropdownService.carteiraSetup.value.find(x => x.id == item.carteiraSetup_Id);
            // if (!carteiraSetup) {
            //     lastId = setupRels.length == 0 ? 0 : setupRels[setupRels.length - 1].id;
            //     carteiraSetup = {
            //         id: ++lastId,
            //         nome: item.nome ?? '',
            //         carteiraProdutoRel: [],
            //         empresa_Id: this.empresa.id,
            //     };
            // }
            // var mensagemErro = ``;
            // var rels: CarteiraProdutoRel[] = carteiraSetup.carteiraProdutoRel;

            // Setando principal objeto Carteira Produto Rel para cada ProdutoTributacaoRel
            for(let produtoTributacaoRel of item.produtoTributacaoRel) {

                // Validando se já existe outro igual
                // let o = this.empresa.carteiraSetup.find(x => {
                //     var mesmaCarteira = carteiraSetup?.nome == x.nome || carteiraSetup?.id == x.id;
                //     var mesmoProdutoTributacaoRel = x.carteiraProdutoRel
                //                             .filter(x => x.produtoTributacaoRel.produto_Id == produtoTributacaoRel.produto_Id
                //                                 && x.produtoTributacaoRel.tributacao_Id == produtoTributacaoRel.tributacao_Id);
                   

                //     return mesmaCarteira && mesmoProdutoTributacaoRel;
                // });

                // if (o) {
                //     var mensagemErro = `<div class="mt-2">
                //                         <p><strong>Carteira: </strong> ${carteiraSetup.nome}</p>
                //                         <p><strong>Produto: </strong> ${produtoTributacaoRel.produto.descricao}</p>
                //                         <p><strong>tributação: </strong>${produtoTributacaoRel.tributacao.descricao}</p>
                //                         <hr>
                //                     </div>`;
                // } else {
                //     lastId = rels.length == 0 ? 0 : rels[rels.length - 1].id;
                //     let carteiraProdutoRel: CarteiraProdutoRel = {
                //         id: ++lastId,
                //         carteiraSetup_Id: carteiraSetup.id,
                //         carteiraSetup: carteiraSetup,
                //         percentual: item.percentual,
                //         produtoTributacao_Id: produtoTributacaoRel.id,
                //         produtoTributacaoRel: produtoTributacaoRel,
                //     }
                //     rels.push(carteiraProdutoRel);
                // }
            }

            // if (mensagemErro.trim() != '') {
            //     this.alert.warn(`  
            //         <p><strong>Atenção</strong></p>
            //         <p>Os seguintes itens não foram adicionados como um setup pois já existe cadastrado</p>
            //         ${mensagemErro}
            //     `);
            // }
            
            // carteiraSetup.carteiraProdutoRel = rels;
            
            // this.empresa.carteiraSetup.push(carteiraSetup);
            this.empresaService.setCreateObject(this.empresaCreateRequest);
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        }
        this.toastr.error('Nenhuma empresa selecionada.');
        return false;
    }

    delete_To_Empresa_List(id: number) {
        if (this.empresaCreateRequest) {
            let list = this.empresaCreateRequest.carteiraSetup ?? [];
            let index = list.findIndex(x => x.id == id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresaCreateRequest.carteiraSetup = list;
                this.empresaService.setCreateObject(this.empresaCreateRequest);
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


   
    getList(empresa_Id: number) {
        return this.http.get<CarteiraSetup[]>(`${this.url}/carteiraSetup/all/${empresa_Id}`).pipe(
            map(list => {
                this.list.next(list);
                return list;
            })
        );
    }


    get(id: number){
        return this.http.get<CarteiraSetup>(`${this.url}/carteiraSetup/${id}`);
    }

    create(request: CarteiraSetupRelRequest) {
    }

    edit(request: CarteiraSetupRelRequest) {
    }

    delete(model: CarteiraSetupRelRequest) {
    }

}
