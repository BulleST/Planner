import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { environment } from 'src/environments/environment';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';
import { CarteiraProdutoRel, CarteiraRequest } from '../models/carteira-produto-rel';
import { CarteiraSetup } from '../models/carteiraSetup.model';

@Injectable({
    providedIn: 'root'
})
export class CarteiraProdutoRelService {
    url = environment.url;
    list = new BehaviorSubject<CarteiraProdutoRel[]>([]);
    objeto = new BehaviorSubject<CarteiraProdutoRel | undefined>(undefined);
    carteiraSetup = new BehaviorSubject<CarteiraSetup[]>([]);
    empresa = new Empresa;

    constructor(
        private table: Table,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
        private empresaService: EmpresaService,
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

    
    add_To_Empresa_List(item: CarteiraRequest) {
        if (item.carteiraProdutoRel.length == 0) {
            this.toastr.error('Insira pelo menos uma combinação entre produto e tributação.');
            return false;
        }
        if (this.empresa) {
            let carteiras_Setup = this.empresaService.object.carteiraSetup;
            carteiras_Setup.sort((x, y) => x.id - y.id);
            
            let last_Id_Carteira_Setup = 0;
            
            // Setando CarteiraSetup
            let carteira_Setup_Index = this.empresa.carteiraSetup.findIndex(x => x.id == item.id);
            let carteira_Setup: CarteiraSetup;

            if (carteira_Setup_Index == -1) {
                last_Id_Carteira_Setup = carteiras_Setup.length == 0 ? 0 : carteiras_Setup[carteiras_Setup.length - 1].id;
                carteira_Setup = {
                    id: ++last_Id_Carteira_Setup,
                    nome: item.nome ?? '',
                    empresa_Id: item.empresa_Id,
                    carteiraRiscoRel: [],
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

            for (let carteiraProdutoRel of item.carteiraProdutoRel) {
                let validacao = this.empresa.carteiraSetup.find(x => {
                    var mesmaCarteira = (x.nome.toLowerCase() == item.nome.toLowerCase() && x.id != item.id) 
                                         || x.id == item.id;
                    
                    var relJaCadastrado = carteira_Produto_Existentes.map(x => x.produtoTributacaoRel)
                                                            .find(y => y.produto_Id == carteiraProdutoRel.produtoTributacaoRel.produto_Id 
                                                                    && y.tributacao_Id == carteiraProdutoRel.produtoTributacaoRel.tributacao_Id);
                    return mesmaCarteira && relJaCadastrado;
                });
                if (!validacao) {
                    let c: CarteiraProdutoRel = {
                        id: ++last_Id_Rel,
                        carteiraSetup_Id: carteira_Setup.id,
                        percentual: 0,
                        produtoTributacao_Id: 0,
                        produtoTributacaoRel: carteiraProdutoRel.produtoTributacaoRel,
                    }
                    carteira_Setup.carteiraProdutoRel.push(c);
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

   
    getList(empresa_Id: number = 1) {
        return this.http.get<CarteiraProdutoRel[]>(`${this.url}/carteiraProdutoRel/all/${empresa_Id}`).pipe(
            map(list => {
                this.list.next(list);
                return list;
            })
        );
    }


    get(id: number){
        return this.http.get<CarteiraSetup>(`${this.url}/carteiraSetup/${id}`);
    }

    create(request: CarteiraRequest) {
        return this.http.post<CarteiraSetup>(`${this.url}/carteiraSetup/`, request);
    }

    edit(request: CarteiraRequest) {
    }

    delete(model: CarteiraRequest) {
    }

}
