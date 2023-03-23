import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Empresa } from "src/app/models/empresa.model";

@Injectable({
    providedIn: 'root'
})
export class MenuItems {
    objeto = new Empresa
    erro: string[] = [];

    constructor(
        private toastr: ToastrService,
    ) {
    }
}

