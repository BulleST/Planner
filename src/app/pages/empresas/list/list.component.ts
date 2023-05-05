import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { Empresa, empresaColumns } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Crypto } from 'src/app/utils/crypto';
import { Table } from 'src/app/utils/table';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Subscription, lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
    faCity = faCity;
    list: Empresa[] = [];
    tableLinks: MenuTableLink[] = [];
    columns = empresaColumns;
    subscription: Subscription[] = [];

    constructor(
        private table: Table,
        private empresaService: EmpresaService,
        public crypto: Crypto,
    ) {

        var selected = this.table.selected.subscribe(res => {
            if (res) {
                this.tableLinks = [
                    { label: 'Editar', routePath: ['editar'], paramsFieldName: ['id'] },
                    { label: (res.ativo ? 'Desabilitar' : 'Habilitar'), routePath: [(res.ativo ? 'desabilitar' : 'habilitar')], paramsFieldName: ['id'] },
                ];
                this.tableLinks = this.table.encryptParams(this.tableLinks);
            }
        });
        this.subscription.push(selected);

        var list = this.empresaService.list.subscribe(res => this.list = res);
        this.subscription.push(list);   

        lastValueFrom(this.empresaService.getList());
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    create = (empresaService: EmpresaService = this.empresaService): void => {
        empresaService.setObject(new Empresa, 'create');
    }
}
