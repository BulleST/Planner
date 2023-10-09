import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/utils/header';
import { ModalOpen } from 'src/app/utils/modal-open';
import { ModoEscuro } from 'src/app/utils/modo-escuro';
import { SwipeService } from 'src/app/utils/swipe';
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

    private swipeCoord?: [number, number];
    private swipeTime?: number;

    constructor(
        private modoEscuro: ModoEscuro,
        private modal: ModalOpen,
        private table: Table,
        private header: Header,
        private swipeService: SwipeService
    ) {
        var getAtivado = this.modoEscuro.getAtivado().subscribe(res => this.modoEscuroAtivado = res);
        var getOpen = this.modal.getOpen().subscribe(res => this.modalOpen = res);
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

    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();
        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }
        else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord![0], coord[1] - this.swipeCoord![1]];
            const duration = time - this.swipeTime!;
            if (duration < 1000
                && Math.abs(direction[0]) > 30
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
                if (direction[0] < 0) {
                    //next
                    this.swipeService.swipePrevious();
                } else {
                    //previous
                    this.swipeService.swipeNext();
                }
            }
        }
    }

}
