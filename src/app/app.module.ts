import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ActionsComponent } from './parts/actions/actions.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { InitialComponent } from './parts/initial/initial.component';
import { NgxMaskModule } from 'ngx-mask';
import { MyAccountComponent } from './parts/my-account/my-account.component';
import { LoadingComponent } from './parts/loading/loading.component';
import { AlertComponent } from './parts/alert/alert.component';
import { ForgotPasswordComponent } from './pages/account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './parts/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionsComponent,
    HeaderComponent,
    FooterComponent,
    InitialComponent,
    MyAccountComponent,
    ResetPasswordComponent,
    LoadingComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FieldsetModule,
    FormsModule,
    DropdownModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true,
        timeOut: 8000
      }),
    TableModule,
    ChartModule,
    NgxMaskModule.forRoot({validation: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
