import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    list = new BehaviorSubject<Cliente[]>([]);

    constructor(
        private router: Router,
        private htto: HttpClient,
        private toastr: ToastrService,
    ) { 
    }

    getList() {
        return this.list;
    } 

    get(id: number) {
        if (this.list.value.length == 0) {
            return new BehaviorSubject('Não encontrado');
        }

        var index = this.list.value.findIndex(x => x.id == id);
        if (index == -1) {
            return new BehaviorSubject('Não encontrado');
        }

        var item = this.list.value[index];
        return new BehaviorSubject(item);
    }

    create(request: Cliente) {
        var id = 1;
        if (this.list.value.length > 0) {
            id = this.list.value[this.list.value.length-1].id + 1;
        }
        request.id = id;
        this.list.value.push(request);
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    edit(request: Cliente) {
        var index = this.list.value.findIndex(x => x.id == request.id);
        if (index == -1) {
            return new BehaviorSubject('Não encontrado')
        }  
        this.list.value[index] = request;
        this.list.next(this.list.value);
        return new BehaviorSubject(request);
    }

    delete(model: Cliente) {
        var index = this.list.value.findIndex(x => x.id == model.id);
        if (index != -1) {
            this.list.value.splice(index, 1);
            this.list.next(this.list.value);
        }
        return this.list;
    }

}
