import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faChartSimple, faEdit, faPlus, faTable, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.model';
import { EstadoCivil } from 'src/app/models/estadoCivil.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { arrowDown, arrowUp } from 'src/app/utils/format';

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormClienteComponent implements OnInit {

    @Input() objeto: Cliente = new Cliente;
    @Input() loading = false;
    @Input() erro: any[] = [];
    @Output() sendData: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    faPlus = faPlus;
    faTrashAlt = faTrashAlt;
    faChartSimple = faChartSimple;
    faTable = faTable;
    faEdit = faEdit;

    perfilInvestidor: PerfilInvestidor[] = [];
    loadingPerfilInvestidor: boolean = true;

    estadoCivil: EstadoCivil[] = [];
    loadingEstadoCivil: boolean = true;

    constructor(
        private toastr: ToastrService,
        private dropdown: DropdownService,
    ) {
        this.dropdown.getPerfilInvestidor().subscribe({
            next: res => {
                this.perfilInvestidor = res;
                this.loadingPerfilInvestidor = false;
            },
            error: err => {
                this.loadingPerfilInvestidor = false;
            }
        })
        this.dropdown.getEstadoCivil().subscribe({
            next: res => {
                this.estadoCivil = res;
                this.loadingEstadoCivil = false;
            },
            error: err => {
                this.loadingEstadoCivil = false;
            }
        })

    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        let index = 0;
        if (changes['objeto']) {
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
        this.sendData.emit(this.objeto);
    }

    calculaIdade() {
        if (this.objeto.dataNascimento && this.objeto.dataNascimento.toString().trim() != '') {
            var ageDifMs = Date.now() - new Date(new Date(this.objeto.dataNascimento).toUTCString()).getTime();;
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            this.objeto.idade = Math.abs(ageDate.getUTCFullYear() - 1970);
        } else {
            this.objeto.idade = '' as unknown as number;
        }
    }
    arrowUp(value: number) {
        return arrowUp(value)
    }

    arrowDown(value: number, allowNegative: boolean = false) {
        return arrowDown(value, allowNegative)
    }




}


