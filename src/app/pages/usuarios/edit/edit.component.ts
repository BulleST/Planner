import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalOpen } from 'src/app/utils/modal-open';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    faTimes = faTimes;
	modalOpen = false;
	objeto: Usuario = new Usuario;
	erro: any[] = [];
	loading = false;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private empresaService: EmpresaService,
	) {
		this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['..'], { relativeTo: this.activatedRoute });
		}, 200);
	}

	send(form: NgForm) {
		this.loading = true;
		this.erro = [];

        var urlArray = this.activatedRoute.snapshot.pathFromRoot.map(x => x.routeConfig?.path).join('/');
        if (urlArray.includes('empresas/cadastrar')) {
            // Adicionar a empresaService.objeto
            this.empresaService.addNewUserToEmpresa(this.objeto);
            

        } else if (urlArray.includes('empresas/editar')) {
            // Adicionar a empresaService.objeto
        } 
        else {
            // Enviar para a API
            this.toastr.success('Operação concluída');
        }

		this.loading = false;
		this.voltar();
	}
}