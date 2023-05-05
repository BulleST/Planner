import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModoEscuro } from 'src/app/utils/modo-escuro';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnDestroy {
    modoEscuroAtivado = false;
    subscription: Subscription[] = [];

    constructor(
        private modoEscuro: ModoEscuro
    ) {
        var getAtivado = this.modoEscuro.getAtivado().subscribe(res => this.modoEscuroAtivado = res);
        this.subscription.push(getAtivado);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }



}
