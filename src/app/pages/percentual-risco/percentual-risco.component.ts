import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPercentage } from '@fortawesome/free-solid-svg-icons';
import { Subscription, lastValueFrom } from 'rxjs';
import { Column } from 'src/app/helpers/column.interface';
import { MenuTableLink } from 'src/app/helpers/menu-links.interface';
import { Account } from 'src/app/models/account.model';
import { Empresa } from 'src/app/models/empresa.model';
import { PercentualRisco } from 'src/app/models/percentual-risco.model';
import { AccountService } from 'src/app/services/account.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PercentualRiscoService } from 'src/app/services/percentual-risco.service';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-percentual-risco',
  templateUrl: './percentual-risco.component.html',
  styleUrls: ['./percentual-risco.component.css']
})
export class PercentualRiscoComponent implements OnDestroy {
    faPercentage = faPercentage;
    empresaSelected = new Empresa;
    list: PercentualRisco[] = [];
    account?: Account;
    subscription: Subscription[] = [];
    loading = false;
    filters: string[] = [];

    constructor(
        private empresaService: EmpresaService,
        public percentualRiscoService: PercentualRiscoService,
        private table: Table,
        private accountService: AccountService,
    ) {

        this.filters = ['capacidadeRisco_Id', 'perfilInvestidor.descricao']

        var account = this.accountService.account.subscribe(res => this.account = res);
        this.subscription.push(account);
        
        var list = this.percentualRiscoService.list.subscribe(res => {
            this.list = res;
            this.calculaTotalLinhas();
        });
        this.subscription.push(list);

        this.table.currentPage.next(1);

        var empresa = this.empresaService.empresa.subscribe(async res => {
            this.empresaSelected = res;
            if (res.id != 0)
                await lastValueFrom(this.percentualRiscoService.getAll());
        });
        this.subscription.push(empresa);


    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    getCellData(row: any, col: Column): any {
        return this.table.getCellData(row, col);
    }

    calculaTotalLinhas() {
        this.list.forEach(item => {
            item = this.calculaTotalItem(item);
            return item
        })
    }

    calculaTotalItem(item: PercentualRisco) {
        item.total = item.baixissimo + item.baixo + item.moderado + item.arrojado + item.superArrojado + item.hedge;
        return item
    }

    create() {
        this.loading = true;
        lastValueFrom(this.percentualRiscoService.create(this.empresaSelected.id))
        .then(res => {
            this.loading = false;
        })
        .catch(res => {
            this.loading = false;
        })
    }

    edit() {
        this.loading = true;
        lastValueFrom(this.percentualRiscoService.edit(this.list))
        .then(res => {
            this.loading = false;
        })
        .catch(res => {
            this.loading = false;
        })
    }

}
