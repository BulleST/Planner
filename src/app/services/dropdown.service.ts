import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { environment } from "src/environments/environment";
import { CarteiraSetup } from "../models/carteiraSetup.model";
import { Empresa } from "../models/empresa.model";
import { EstadoCivil } from "../models/estadoCivil.model";
import { PerfilInvestidor } from "../models/perfilInvestidor.model";
import { TipoAtivo } from "../models/tipoAtivo.model";
import { TipoLiquidez } from "../models/tipoLiquidez.model";
import { TipoRisco } from "../models/tipoRisco.model";
import { PerfilAcesso } from "../models/account-perfil.model";
import { EmpresaService } from "./empresa.service";

@Injectable({
    providedIn: 'root'
})
export class DropdownService {
    url = environment.url;

    tipoAtivo = new BehaviorSubject<TipoAtivo[]>([]);
    tipoRisco = new BehaviorSubject<TipoRisco[]>([]);
    tipoLiquidez = new BehaviorSubject<TipoLiquidez[]>([]);
    perfilAcesso = new BehaviorSubject<PerfilAcesso[]>([]);
    perfilInvestidor = new BehaviorSubject<PerfilInvestidor[]>([]);
    carteiraSetup = new BehaviorSubject<CarteiraSetup[]>([]);
    estadoCivil = new BehaviorSubject<EstadoCivil[]>([]);

    empresa: Empresa = new Empresa;
    
    constructor(
        private http: HttpClient,
        private empresaService: EmpresaService
    ) {
        this.empresaService.empresa.subscribe(res => {
            this.empresa = res;
        })
    }

    getAtivo() {
        return this.http.get<TipoAtivo[]>(`${this.url}/tipoAtivo/getAll`).pipe(map(res => {
            this.tipoAtivo.next(res);
            return res;
        }));
    }

    getRisco() {
        return this.http.get<TipoRisco[]>(`${this.url}/tipoRisco/getAll`).pipe(map(res => {
            this.tipoRisco.next(res);
            return res;
        }));
    }

    getLiquidez() {
        return this.http.get<TipoLiquidez[]>(`${this.url}/tipoLiquidez/getAll`).pipe(map(res => {
            this.tipoLiquidez.next(res);
            return res;
        }));
    }

    getPerfilAcesso() {
        return this.http.get<PerfilAcesso[]>(`${this.url}/perfilAcesso/getAll`).pipe(map(res => {
            this.perfilAcesso.next(res);
            return res;
        }));
    }
    
    getPerfilInvestidor() {
        return this.http.get<PerfilInvestidor[]>(`${this.url}/perfilInvestidor/getAll`).pipe(map(res => {
            this.perfilInvestidor.next(res);
            return res;
        }));
    }

    getCarteiraSetup() {
        return this.http.get<CarteiraSetup[]>(`${this.url}/carteiraSetup/getAll`).pipe(map(res => {
            this.carteiraSetup.next(res);
            return res;
        }));
    }
    
    getEstadoCivil() {
        return this.http.get<EstadoCivil[]>(`${this.url}/estadoCivil/getAll`).pipe(map(res => {
            this.estadoCivil.next(res);
            return res;
        }));
    }
}
