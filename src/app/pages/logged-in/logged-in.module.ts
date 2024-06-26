import { APP_INITIALIZER, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedInRoutingModule } from './logged-in.routing';
import { InitialComponent } from './initial/initial.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MinhaEmpresaComponent } from './minha-empresa/minha-empresa.component';
import { appInitializer } from 'src/app/helpers/app.initializer';
import { AccountService } from 'src/app/services/account.service';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PercentualRiscoComponent } from '../percentual-risco/percentual-risco.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        InitialComponent,
        MyAccountComponent,
        NavigationComponent,
        MinhaEmpresaComponent,
        ChangePasswordComponent,
        PercentualRiscoComponent,
    ],
    imports: [
        CommonModule,
        LoggedInRoutingModule,
        NgxMaskModule.forChild(),
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        TableModule,
        ButtonModule,
        InputNumberModule,
    ],
    bootstrap: [InitialComponent],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService, Router] },
    ]

})
export class LoggedInModule {}
