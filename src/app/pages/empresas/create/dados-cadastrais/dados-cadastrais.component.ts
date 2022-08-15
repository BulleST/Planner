import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
    selector: 'app-dados-cadastrais',
    templateUrl: './dados-cadastrais.component.html',
    styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent implements OnInit {
    faIdCard = faIdCard;
    objeto: Empresa = new Empresa;
    
    constructor(
    ) { }

    ngOnInit(): void {
    }

    next(form: NgForm) {
        console.log(form)
    }

}
