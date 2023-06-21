import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/utils/header';
import { ModalOpen } from 'src/app/utils/modal-open';
import { ModoEscuro } from 'src/app/utils/modo-escuro';
import { Table } from 'src/app/utils/table';

@Component({
    selector: 'app-initial',
    templateUrl: './initial.component.html',
    styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnDestroy {

    modoEscuroAtivado = false;
    modalOpen = false;
    navigationOpen = false;
    loading = false;
    subscription: Subscription[] = [];

    constructor(
        private modoEscuro: ModoEscuro,
        private modal: ModalOpen,
        private table: Table,
        private header: Header,
    ) {
        var getAtivado = this.modoEscuro.getAtivado().subscribe(res => this.modoEscuroAtivado = res);
        var getOpen = this.modal.getOpen().subscribe(res =>this.modalOpen = res);
        var open = this.header.open.subscribe(res => this.navigationOpen = res);
        var loading = this.table.loading.subscribe(res => this.loading = res);
        this.subscription.push(getAtivado);
        this.subscription.push(getOpen);
        this.subscription.push(open);
        this.subscription.push(loading);
    }
    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }


}
