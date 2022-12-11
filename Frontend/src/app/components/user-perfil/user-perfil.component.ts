import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PublicacionService } from '../../services/publicacion.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.css']
})
export class UserPerfilComponent implements OnInit {
  public user: any
  public publicaciones: any
  public llegapublicaciones: any
  public NoPubli: any = false

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _publiService: PublicacionService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let name = params.name
      this._userService.getUserByName(name).subscribe(
        response => {
          this.user = response
          let miId = localStorage.getItem('usl')
          if(miId == this.user._id){
            this._router.navigate(['/perfil'])
          }
          this.getPublicaciones(this.user._id)
        },
        err => {
          console.log(err)
        }
      )
    })
  }

  getPublicaciones(id){
    this._publiService.getPersonalPublicaciones(id).subscribe(
      response => {
        let invPublicaciones = response
          this.llegapublicaciones = invPublicaciones
          this.llegapublicaciones.reverse()
          this.publicaciones = this.llegapublicaciones
          if(this.publicaciones.length == 0){
            this.NoPubli = true
          }else{
            this.NoPubli = false
          }
      },
      err => {
        console.log(err)
      }
    )
  }

}
