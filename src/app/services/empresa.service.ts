import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../models/empresa.model';
import { Crypto } from '../utils/crypto';
import { Usuario } from '../models/usuario.model';
import { Produto } from '../models/produto.model';
import { CarteiraSetupRequest } from '../models/carteiraSetup-produto.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {
    url = environment.url;
    list = new BehaviorSubject<Empresa[]>([]);
    objeto = new BehaviorSubject<Empresa | undefined>(undefined);

    constructor(
        private router: Router,
        private http: HttpClient,
        private toastr: ToastrService,
        private crypto: Crypto,
    ) { 
    }

    getObject() {
        var e = localStorage.getItem('empresa')
        if(e) {
            this.setObject(this.crypto.decrypt(e) ?? new Empresa)
        }
        return this.objeto;
    }

    setObject(value: Empresa) {
        localStorage.setItem('empresa', this.crypto.encrypt(value) ?? '')
        this.objeto.next(value);
     
    }


    addNewUserToEmpresa(user: Usuario) {
        var empresa = this.objeto.value;
        var users = empresa?.usuario ?? [];
        if (empresa ) {
            var emails = users.map(x => x.email).find(x => x.toLowerCase() == user.email.toLowerCase());
            if (emails) {
                this.toastr.error('Esse e-mail já está cadastrado para outro usuário!!');
                return;
            } else {
                users.sort((x, y) => x.id - y.id)
                var lastId = users.length == 0 ? 0 : users[users.length - 1].id;
                user.id = lastId++;
                users.push(user);
                empresa.usuario = users;
                this.objeto.next(empresa);
                this.toastr.success('Operação concluída');
            }
        }
    }
    addNewProdutoToEmpresa(produto: Produto) {
        var empresa = this.objeto.value;
        var produtos = empresa?.produto ?? [];
        if (empresa) {
            produtos.sort((x, y) => x.id - y.id)
            var lastId = produtos.length == 0 ? 0 : produtos[produtos.length - 1].id;
            produto.id = lastId++;
            produtos.push(produto);
            empresa.produto = produtos;
            this.objeto.next(empresa);
            this.toastr.success('Operação concluída');
        }
    }
    addNewSetupToEmpresa(carteiraSetup: CarteiraSetupRequest) {
        var empresa = this.objeto.value;
        var setups = empresa?.carteiraSetup ?? [];
        if (empresa) {

            setups.sort((x, y) => x.id - y.id)
            var lastId = setups.length == 0 ? 0 : setups[setups.length - 1].id;
            carteiraSetup.id = lastId++;

            setups.push(carteiraSetup);
            empresa.carteiraSetup = setups;
            this.objeto.next(empresa);
            this.toastr.success('Operação concluída');
        }
    }



    getList() {
        return this.http.get<Empresa[]>(`${this.url}/Empresa/`);
    } 

    get(id: number): BehaviorSubject<undefined | Empresa> {
        if (this.list.value.length == 0) {
            return new BehaviorSubject<undefined | Empresa>(undefined);
        }

        var index = this.list.value.findIndex(x => x.id == id);
        if (index == -1) {
            return new BehaviorSubject<undefined | Empresa>(undefined);
        }

        var item = this.list.value[index];
        return new BehaviorSubject<undefined | Empresa>(item);
    }

    create(request: Empresa) {
        var id = 1;
        if (this.list.value.length > 0) {
            id = this.list.value[this.list.value.length-1].id + 1;
        }
        request.id = id;
        this.list.value.push(request);
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    edit(request: Empresa) {
        var index = this.list.value.findIndex(x => x.id == request.id);
        if (index == -1) {
            return new BehaviorSubject('Não encontrado')
        }  
        this.list.value[index] = request;
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    delete(model: Empresa) {
        var index = this.list.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list.value.splice(index, 1);
            this.list.next(this.list.value);
        }
        return this.list;
    }

}
