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
import { ProdutoTributacaoRel } from '../models/produto-tributacao-rel.model';
import { MaskApplierService } from 'ngx-mask';

@Injectable({
    providedIn: 'root'
})
export class CarteiraSetupService {
    url = environment.url;
    list = new BehaviorSubject<CarteiraSetup[]>([]);
    objeto = new BehaviorSubject<CarteiraSetup | undefined>(undefined);
    carteiraSetup = new BehaviorSubject<CarteiraSetup[]>([]);
    empresa = new Empresa;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private dropdownService: DropdownService,
        private empresaService: EmpresaService,
        private alert: AlertService,
        private mask: MaskApplierService,
    ) {
        this.empresaService.empresaObject.subscribe(res => {
            this.empresa = res;
        });
    }

    getObject() {
        let e = localStorage.getItem('setup')
        if (e) {
            this.setObject(this.crypto.decrypt(e) ?? new CarteiraSetup)
        }
        return this.objeto;
    }

    setObject(value: CarteiraSetup) {
        localStorage.setItem('setup', this.crypto.encrypt(value) ?? '')
        this.setObject(value);
    }

    /*add_To_Empresa_List(item: CarteiraSetupRelRequest) {
        if (item.produtoTributacaoRel.length == 0) {
            this.toastr.error('Insira pelo menos uma combinação entre produto e tributação.');
            return false;
        }
        if (this.Empresa) {
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
                let validacao = this.Empresa.carteiraSetup.find(x => {
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
                    this.Empresa.carteiraSetup.push(carteiraProdutoRel);
                }
            }

            this.empresaService.setCreateObject(this.Empresa);
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
        if (this.empresa) {
            let carteiras_Setup = this.empresaService.object.carteiraSetup;
            carteiras_Setup.sort((x, y) => x.id - y.id);
            
            let last_Id_Carteira_Setup = 0;
            
            // Setando CarteiraSetup
            let carteira_Setup_Index = this.empresa.carteiraSetup.findIndex(x => x.id == item.carteiraSetup_Id);
            let carteira_Setup: CarteiraSetup;

            if (carteira_Setup_Index == -1) {
                last_Id_Carteira_Setup = carteiras_Setup.length == 0 ? 0 : carteiras_Setup[carteiras_Setup.length - 1].id;
                carteira_Setup = {
                    id: ++last_Id_Carteira_Setup,
                    nome: item.carteiraSetup ?? '',
                    empresa_Id: item.empresa_Id,
                    carteiraProdutoRel: []
                };
            } else {
                carteira_Setup = this.empresa.carteiraSetup[carteira_Setup_Index];
                carteira_Setup.carteiraProdutoRel = []
            }
            
            var carteira_Produto_Existentes_Bugados = this.empresa.carteiraSetup.map(rel => rel.carteiraProdutoRel) as never[];
            var carteira_Produto_Existentes = [].concat.apply([], carteira_Produto_Existentes_Bugados) as CarteiraProdutoRel[];
            carteira_Produto_Existentes.sort((x,y) => x.id - y.id);
            
            let last_Id_Rel = carteira_Produto_Existentes.length == 0 ? 0 : carteira_Produto_Existentes[carteira_Produto_Existentes.length -1].id;

            for (let produtoTributacaoRel of item.produtoTributacaoRel) {
                let validacao = this.empresa.carteiraSetup.find(x => {
                    var mesmaCarteira = (x.nome.toLowerCase() == item.carteiraSetup.toLowerCase() && x.id != item.id) 
                                         || x.id == item.id;
                    
                    var relJaCadastrado = carteira_Produto_Existentes.map(x => x.produtoTributacaoRel)
                                                            .find(y => y.produto_Id == produtoTributacaoRel.produto_Id 
                                                                    && y.tributacao_Id == produtoTributacaoRel.tributacao_Id);
                    return mesmaCarteira && relJaCadastrado;
                });
                if (!validacao) {
                    let carteiraProdutoRel: CarteiraProdutoRel = {
                        id: ++last_Id_Rel,
                        carteiraSetup_Id: carteira_Setup.id,
                        percentual: item.percentual,
                        produtoTributacao_Id: 0,
                        produtoTributacaoRel: produtoTributacaoRel,
                    }
                    carteira_Setup.carteiraProdutoRel.push(carteiraProdutoRel);
                }
            }
            if (carteira_Setup_Index == -1) {
                this.empresa.carteiraSetup.push(carteira_Setup);
            }
            else {
                this.empresa.carteiraSetup.splice(carteira_Setup_Index, 1, carteira_Setup)
            }

            this.empresaService.setObject(this.empresa);
            this.toastr.success('Operação concluída');
            this.table.resetSelection();
            return true;
        } else {
            this.toastr.error('Nenhuma empresa selecionada.');
            return false;
        }
    }

    delete_Rel_To_Empresa_List(carteiraSetup_id: number, rel_id: number) {
        if (this.empresa) {
            let carteira_Setup_Index = this.empresa.carteiraSetup.findIndex(x => x.id == carteiraSetup_id);
            if (carteira_Setup_Index != -1) {
                let carteira_Setup = this.empresa.carteiraSetup[carteira_Setup_Index];
                let rel_Index = carteira_Setup.carteiraProdutoRel.findIndex(x => x.id == rel_id);
                if (rel_Index != -1) {
                    carteira_Setup.carteiraProdutoRel.splice(rel_Index, 1);
                    this.empresa.carteiraSetup.splice(carteira_Setup_Index, 1, carteira_Setup);
                    this.empresaService.setObject(this.empresa);
                    this.toastr.success('Operação concluída');
                    this.table.resetSelection();
                    return true;
                } else {
                    this.toastr.error('Setup não encontrado!!');
                    return false;
                }
            } else {
                this.toastr.error('Setup não encontrado!!');
                return false;
            }
        } else {
            this.toastr.error('Nenhuma empresa selecionada.');
            return false;
        }
    }

    delete_To_Empresa_List(carteiraSetup_Id: number) {
        if (this.empresa) {
            let list = this.empresa.carteiraSetup ?? [];
            let index = list.findIndex(x => x.id == carteiraSetup_Id);
            if (index != -1) {
                list.splice(index, 1);
                this.empresa.carteiraSetup = list;
                this.empresaService.setObject(this.empresa);
                this.toastr.success('Operação concluída');
                this.table.resetSelection();
                return true;
            } else {
                this.toastr.error('Setup não encontrado!!');
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
