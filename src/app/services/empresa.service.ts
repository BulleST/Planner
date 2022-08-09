import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Empresa, empresas } from '../models/empresa.model';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    list = new BehaviorSubject<Empresa[]>([]);

    constructor(
        private router: Router,
        private http: HttpClient,
        private toastr: ToastrService,
    ) { 
        this.list.next(empresas);
    }

    getList() {
        return this.list;
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
