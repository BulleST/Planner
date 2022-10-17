import { Component, OnInit } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { userColumns, Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/user.service.ts';

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
        private userService: UsuarioService
    ) { 
        this.userService.getList().subscribe();
        this.userService.list.subscribe(res => this.list = res);
    }

    ngOnInit(): void {
    }

}
