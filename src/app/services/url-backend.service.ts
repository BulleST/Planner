import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { Crypto } from '../utils/crypto';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { DropdownService } from './dropdown.service';
import { Empresa } from '../models/empresa.model';
import { EmpresaService } from './empresa.service';
import { Table } from '../utils/table';
import { AccountService } from './account.service';
import { Account } from '../models/account.model';
import { Role } from '../models/account-perfil.model';

@Injectable({
    providedIn: 'root'
})
export class UrlBackendService {

    url = new BehaviorSubject<string>(environment.url);

    constructor(
    ) {
    }
    
    setUrl(url: string) {
        localStorage.setItem('url-backend', url)
        this.url.next(url)
        return url;
    }

}
