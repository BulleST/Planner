import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
    selector: 'app-shared-deactivated',
    templateUrl: './deactivated.component.html',
    styleUrls: ['./deactivated.component.css']
})
export class DeactivatedComponent implements OnInit, OnChanges {
    faTimes = faTimes;
    @Input() objeto: any = {};
    @Input() service: any;
    erro: any[] = [];
    loading = false;
    url = '';
    constructor(
        private modal: ModalOpen,
    ) {
      
    }

    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['objeto']) {
            this.objeto = changes['objeto'].currentValue;
            this.objeto.ativo = !this.objeto.dataDesativado
        }
        if (changes['service']) {
            this.service = changes['service'].currentValue;
        }
    }

    voltar() {
        this.modal.voltar();
    }

    send() {
        this.loading = true;
        this.erro = [];
        if (this.url.includes('empresas/cadastrar') || this.objeto.registroNaoSalvo) {
            let result = this.service.delete_To_Empresa_List(this.objeto.id);
            if (result)
                this.voltar();
            this.loading = false;
        }
        else {
            // Enviar para a API
            this.service.deactivated(this.objeto.id, !!this.objeto.dataDesativado).subscribe({
                next: async res => {
                    await lastValueFrom(this.service.getList());
                    this.voltar();
                    this.service.setObject(new Produto);
                },
                error: err => {
                    this.loading = false;
                }
            })
        }
    }
}
