import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoadingComponent } from './parts/loading/loading.component';
import { AlertComponent } from './parts/alert/alert.component';
import { SharedModule } from './shared/shared.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestInterceptor } from './helpers/request.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { EmpresaSharedModule } from './pages/empresas/shared/empresa-shared.module';
import { appInitializer } from './helpers/app.initializer';
import { AccountService } from './services/account.service';
import { RouterStateSnapshot } from '@angular/router';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        LoadingComponent,
        AlertComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        EmpresaSharedModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FieldsetModule,
        FormsModule,
        DropdownModule,
        NgbPopoverModule,
        ToastrModule.forRoot({ preventDuplicates: true, timeOut: 8000, }),
        NgxMaskModule.forRoot({ validation: true, triggerOnMaskChange: true, }),
        TableModule,
        ChartModule,
    ],
    providers: [
        CurrencyPipe,
        MaskPipe,
        DatePipe,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private config: PrimeNGConfig

    ) {

        this.config.setTranslation({
            startsWith: 'Começa com',
            contains: 'Contém',
            notContains: 'Não contem',
            endsWith: 'Termina com',
            equals: 'Igual a',
            notEquals: 'Diferente de',
            noFilter: 'Sem filtro',
            lt: 'Menor que', // Less Than
            lte: 'Menor que ou igual a', // Less Than or Equal to
            gt: 'Maior que', // Greater than
            gte: 'Maior que ou igual a', // Greater than or equal to
            is: 'Igual',
            isNot: 'Diferente',
            before: 'Anterior a',
            after: 'Posterior a',
            dateIs: 'Data igual a',
            dateIsNot: 'Data diferente de',
            dateBefore: 'Data anterior a',
            dateAfter: 'Data posterior a',
            clear: 'Limpar filtro',
            apply: 'Filtrar',
            matchAll: 'Filtrar todos',
            matchAny: 'Filtrar qualquer um',
            addRule: 'Adicionar filtro',
            removeRule: 'Remover filtro',
            weak: 'Fraca',
            medium: 'Média',
            strong: 'Forte',
            emptyMessage: 'Nenhum resultado encontrado',
            emptyFilterMessage: 'Nenhum resultado encontrado',
        })
        this.config.filterMatchModeOptions = {
            text: [
                FilterMatchMode.STARTS_WITH,
                FilterMatchMode.CONTAINS,
                FilterMatchMode.NOT_CONTAINS,
                FilterMatchMode.ENDS_WITH,
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS
            ],
            numeric: [
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS,
                FilterMatchMode.LESS_THAN,
                FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
                FilterMatchMode.GREATER_THAN,
                FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
            ],
            date: [
                FilterMatchMode.DATE_IS,
                FilterMatchMode.DATE_IS_NOT,
                FilterMatchMode.DATE_BEFORE,
                FilterMatchMode.DATE_AFTER,
                FilterMatchMode.STARTS_WITH,
                FilterMatchMode.CONTAINS,
                FilterMatchMode.NOT_CONTAINS,
                FilterMatchMode.ENDS_WITH,
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS
            ]
        }

    }
}
