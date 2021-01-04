import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public usuarios: any
  public llegausuarios: any

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
    this._userService.getUsers().subscribe(
      response => {
        let users = response
        this.llegausuarios = users
        this.llegausuarios.reverse()
        this.usuarios = this.llegausuarios
      },
      err => {
        console.log(err)
      }
    )
  }

}
