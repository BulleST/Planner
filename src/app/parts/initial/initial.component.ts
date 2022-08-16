import { Component, OnInit } from '@angular/core';
import { ModalOpen } from 'src/app/utils/modal-open';
import { ModoEscuro } from 'src/app/utils/modo-escuro';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  modoEscuroAtivado = false;
  modalOpen = false;

  constructor(
    private modoEscuro: ModoEscuro,
    private modal: ModalOpen
  ) {
    this.modoEscuro.getAtivado().subscribe(res => this.modoEscuroAtivado = res);
    this.modal.getOpen().subscribe(res => this.modalOpen = res);
  }

  ngOnInit(): void {

  }


}
