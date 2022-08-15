import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { CreateUsuarioComponent } from "./usuarios/create/create.component";

@NgModule({
    declarations: [
        CreateUsuarioComponent,
    ],
    imports: [
        FormsModule,
        NgbPopoverModule
    ],
    exports: [
        CreateUsuarioComponent
    ],
})
export class SharedModule {
   
}
