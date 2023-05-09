import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { faChartSimple, faEdit, faPlus, faTable, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { EstadoCivil } from 'src/app/models/estadoCivil.model';
import { PerfilInvestidor } from 'src/app/models/perfilInvestidor.model';
import { DropdownService } from 'src/app/services/dropdown.service';
import { arrowDown, arrowUp } from 'src/app/utils/format';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormClienteComponent {

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
    
    @ViewChild('dataNascimento') dataNascimento?: NgModel;
    dataNascimentoMin = '';
    dataNascimentoMax = '';

    constructor(
        private toastr: ToastrService,
        private dropdown: DropdownService,
    ) {

        lastValueFrom(this.dropdown.getPerfilInvestidor())
            .then(res => this.perfilInvestidor = res)
            .finally(() => this.loadingPerfilInvestidor = false);

        lastValueFrom(this.dropdown.getEstadoCivil())
            .then(res => this.estadoCivil = res)
            .catch()
            .finally(() => this.loadingEstadoCivil = false);
            
        var dataNascimentoMax = new Date();
        dataNascimentoMax.setFullYear(dataNascimentoMax.getFullYear() + 100);
        this.dataNascimentoMax = dataNascimentoMax.toJSON().substring(0, 10);
        
        var dataNascimentoMin = new Date();
        dataNascimentoMin.setFullYear(dataNascimentoMin.getFullYear() - 100);
        this.dataNascimentoMin = dataNascimentoMin.toJSON().substring(0, 10);

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            this.objeto = {
                "id": 0,
                "empresa_Id": 3,
                "account_Id": undefined as unknown as number,
                "perfilInvestidor_Id": 2,
                "nome": "Teste aaa",
                "idade": 22,
                "altura": "" as unknown as number,
                "peso": "" as unknown as number,
                "imc": "" as unknown as number,
                "estadoCivil_Id": 2,
                "dataNascimento": "2000-11-11" as unknown as Date,
                "cpf": 11111111111,
                "rg": 111111111,
                "email": "teste@teste.com",
                "receita": 11111111111111,
                "despesa": 11111111111111,
                "idadeAposentadoria": 0,
                "rendaMensalAposentadoria": 0,
                "rentabilidadeAposentadoria": 0,
                "registroNaoSalvo": false
            }
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
        this.objeto.idadeAposentadoria = parseInt(this.objeto.idadeAposentadoria.toString());
        this.objeto.cpf = parseInt(this.objeto.cpf.toString());
        this.objeto.rg = parseInt(this.objeto.rg.toString());
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

    validateDataNascimento() {
        var data = new Date(this.objeto.dataNascimento);
        var dataNascimentoMin = new Date(this.dataNascimentoMin);
        var dataNascimentoMax = new Date(this.dataNascimentoMax);
        if (this.dataNascimento) {
            if (data > dataNascimentoMax) {
                this.dataNascimento.control.setErrors({
                    max: true
                })
            }
            else if (data < dataNascimentoMin) {
                this.dataNascimento.control.setErrors({
                    min: true
                })
            }
        }
    }

    validateNumber(input: NgModel) {
        var min = 0;
        var max = 100000000;
        var value = input.value;
        
        console.log(input, value);

        if (value > max) {
            input.control.setErrors(({
                max: true,
            }))
        }
        
        if (value > min) {
            input.control.setErrors(({
                min: true,
            }))
        }
        return input;
    }
}


