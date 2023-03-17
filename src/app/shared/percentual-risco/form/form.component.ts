import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PercentualRisco } from 'src/app/models/percentual-risco.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { DropdownService } from 'src/app/services/dropdown.service';

@Component({
    selector: 'app-form-percentual-risco',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormPercentualRiscoComponent implements OnInit, OnChanges {
    faTrashAlt = faTrashAlt;
    @Input() objeto: PercentualRisco = new PercentualRisco;
    @Input() loading = false;
    @Input() erro: any[] = [];

    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();
    perfilInvestidor: PerfilInvestidor[] = [];
    loadingPerfilInvestidor = true;

    constructor(
        private toastr: ToastrService,
        private dropdownService: DropdownService
    ) {
        this.dropdownService.getPerfilInvestidor().subscribe(res => {
            this.loadingPerfilInvestidor = false;
            this.perfilInvestidor = res;
        })
    }

    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']){
            this.objeto = changes['objeto'].currentValue;
        }

        if (changes['loading'])
            this.loading = changes['loading'].currentValue;

        if (changes['erro'])
            this.erro = changes['erro'].currentValue;

    }


    send(form: NgForm) {
        if (form.invalid) {
            this.toastr.error('Campos inválidos');
            this.erro = ['Campos inválidos'];
            return;
        }
        this.erro = [];
        this.sendData.emit(form);
    }
}


