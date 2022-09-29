import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { CapacidadeRiscoTemp } from 'src/app/models/capacidadeRisco-temp.model';

import { Cliente } from 'src/app/models/cliente.model';
import { EstadoCivil } from 'src/app/models/estadoCivil.model';
import { FluxosPontuais } from 'src/app/models/fluxosPontuais.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { arrowDown, arrowUp } from 'src/app/utils/format';

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormClienteComponent implements OnInit, OnChanges {

    @Input() cliente: Cliente = new Cliente;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<NgForm> = new EventEmitter<NgForm>();

    faTrash = faTrash;
  risco: CapacidadeRiscoTemp = new CapacidadeRiscoTemp;
  fluxosPontuais: FluxosPontuais[] = []

    loadingPerfilInvestidor = true;
    loadingEstadoCivil = true;
    estadoCivil: EstadoCivil[] = [];
    perfilInvestidor: PerfilInvestidor[] = [];

    faPlus = faPlus;
    faTrashAlt = faTrashAlt;

    isEditPage: boolean = false;
    
    constructor(
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private dropdown: DropdownService,
    ) {
        this.activatedRoute.params.subscribe(item => {
            this.isEditPage = !!item['cliente_id'];
        });

        this.dropdown.getEstadoCivil().subscribe(res => {
            this.estadoCivil = res;
            this.loadingEstadoCivil = false;
        });
        this.dropdown.estadoCivil.subscribe(res => this.estadoCivil = res);

        this.dropdown.getPerfilInvestidor().subscribe(res => {
            this.perfilInvestidor = res;
            this.loadingPerfilInvestidor = false;
        });
        this.dropdown.perfilInvestidor.subscribe(res => this.perfilInvestidor = res);

       
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['cliente']) {
            this.cliente = changes['cliente'].currentValue;
            console.log(this.cliente)
        }

        if (changes['loading'])
            this.loading = changes['loading'].currentValue;

        if (changes['erro'])
            this.erro = changes['erro'].currentValue;

    }

    calculaIdade() {
        console.log(this.cliente.dataNascimento)
        if (this.cliente.dataNascimento && this.cliente.dataNascimento.toString().trim() != '') {
            console.log('if')
            var ageDifMs = Date.now() - new Date(new Date(this.cliente.dataNascimento).toUTCString()).getTime();            ;
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            this.cliente.idade = Math.abs(ageDate.getUTCFullYear() - 1970);
        } else {
            console.log('ekse')
            this.cliente.idade = '' as unknown as number;
        }
    }
    arrowUp(value: number) {
      return arrowUp(value)
    }
    arrowDown(value: number, allowNegative: boolean = false) {
      return arrowDown(value, allowNegative)
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


