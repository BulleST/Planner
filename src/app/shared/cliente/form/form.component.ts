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
import { validaCPF } from 'src/app/utils/validate-cpf';
import { ClienteService } from 'src/app/services/cliente.service';
import { getError } from 'src/app/utils/error';
import { InputNumberComponent } from '../../input-number/input-number.component';

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
    emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    @ViewChild('receita') receita: InputNumberComponent;
    @ViewChild('despesa') despesa: InputNumberComponent;

    constructor(
        private toastr: ToastrService,
        private dropdown: DropdownService,
        private clienteService: ClienteService,
    ) {

        lastValueFrom(this.dropdown.getPerfilInvestidor())
            .then(res => this.perfilInvestidor = res)
            .finally(() => this.loadingPerfilInvestidor = false);

        lastValueFrom(this.dropdown.getEstadoCivil())
            .then(res => this.estadoCivil = res)
            .catch()
            .finally(() => this.loadingEstadoCivil = false);
            
        var data = new Date();
        this.dataNascimentoMax = data.toJSON().substring(0, 10);

        var dataNascimentoMin = data;
        dataNascimentoMin.setFullYear(dataNascimentoMin.getFullYear() - 100);
        this.dataNascimentoMin = dataNascimentoMin.toJSON().substring(0, 10);


    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) this.objeto = changes['objeto'].currentValue;       
        if (changes['loading']) this.loading = changes['loading'].currentValue;
        if (changes['erro']) this.erro = changes['erro'].currentValue;
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

    // Receita deve ser maior que despesa
    validaReceitaDespesa(input: NgModel) {
        if (this.objeto.receita < this.objeto.despesa) {
            if (input.name == 'despesa') {
                this.despesa.error = {message: 'Despesa não pode ser maior que receita.'};
            } else if (input.name == 'receita'){
                this.receita.error = {message: 'Receita não pode ser menor que despesa.'};
            }
        } else {
            this.receita.error = null;
            this.despesa.error = null;
            this.receita.validate();
            this.despesa.validate();
        }
        
        return input;
    }

    validaRG_CPF(input: NgModel, doc: number) {
        if (!input) {
            return;
        }
        if (!doc || doc == 0) {
            input.control.setErrors({ required: true });
            return;
        }

        if (input.name == 'cpf') {
            var valid = validaCPF(doc)
            if (!valid) {
                input.control.setErrors({ invalid: true });
                return;
            }
        }

        lastValueFrom(this.clienteService.getByDoc(this.objeto.id, doc))
            .then(res => { })
            .catch(res => {
                input.control.setErrors({ jaExiste: getError(res)});
            });

    }

}


