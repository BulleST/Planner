import { Component, OnInit } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { userColumns, Usuario } from 'src/app/models/usuario.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/user.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    faUsers = faUsers;
    columns = userColumns;
    list: Usuario[] = [];
    constructor(
        private userService: UsuarioService,
        private empresaService: EmpresaService,
    ) { 
        this.userService.getList(1).subscribe();
        this.userService.list.subscribe(res => this.list = res);


    }

    ngOnInit(): void {
    }

}
