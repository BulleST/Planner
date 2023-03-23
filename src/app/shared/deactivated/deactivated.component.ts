import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { CarteiraSetup } from 'src/app/models/carteiraSetup.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Produto } from 'src/app/models/produto.model';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
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
        private empresaService: EmpresaService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.url = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
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
                    var list = await lastValueFrom(this.service.getList());
                    if (this.url.includes('empresas/editar')) {
                        var empresa = this.empresaService.object;
                        if (this.url.includes('usuarios'))
                            empresa.account = list as Usuario[];
                        else if(this.url.includes('clientes'))
                            empresa.cliente = list as Cliente[];
                        else if(this.url.includes('produtos'))
                            empresa.produto = list as Produto[];
                        else if(this.url.includes('setup'))
                            empresa.carteiraSetup = list as CarteiraSetup[];
                        this.empresaService.setObject(empresa, 'edit usuario');
                    }
                    this.voltar();
                    this.service.setObject({});
                },
                error: err => {
                    this.loading = false;
                }
            })
        }
    }
}
