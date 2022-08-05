import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  list: Cliente[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
