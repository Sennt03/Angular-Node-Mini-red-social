import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  public user: any
  public valid: any
  public err: any
  public Userimg: any
  public img: any
  public res_img: any
  public url_img: any
  public sub_img = false
  public cloudinary_url = 'https://api.cloudinary.com/v1_1/sennt03/image/upload'

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.user = new User('', '', '', '', '')
  }

  ngOnInit() {
    let id = localStorage.getItem('usl')
    this.getProfile(id)
  }

  getProfile(id){
    this._userService.getUser(id).subscribe(
      response => {
       this.Userimg = response
      },
      err => {
        console.log(err)
      }
    )
  }

  cancelar(){
    this._router.navigate(['/perfil'])
  }

  guardar(){
    this.valid = 'Cargando'
    if(this.user.name){
      this.confirmadoGuardar()
    }else if(this.user.email){
      let gmail = '@gmail.com'
      let hotmail = '@hotmail.com'
      let si = 0
      for (let i = 0; i < this.user.email.length; i++) {
        if(this.user.email.substring(i) == gmail || this.user.email.substring(i) == hotmail){
          si = 1
        }
      }
      if(si == 1){
        this.confirmadoGuardar()
      }else{
        this.valid = 'emailInco'
      }
    }else if(this.sub_img){
      this.confirmadoGuardar()
    }else{
      this.valid = 'algunCampo'
    }
  }

  resetValid(){
    setTimeout(() => {
      this.valid = ''
    }, 3000)
  }

  confirmadoGuardar(){
    if(this.sub_img){
      axios.post(this.cloudinary_url, this.img, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => {
        console.log(response)
        this.res_img = response
        this.url_img = this.res_img.data.secure_url
        this.user.image = this.url_img

        this._userService.editUser(this.user).subscribe(
      response => {
        this.valid = 'confirm'
        let id = localStorage.getItem('usl')
        this.getProfile(id)
        this.resetValid()
      },
      err => {
        this.err = err
        this.valid = 'correoFalse'
      }
    )
    })
    .catch((err) => {
        console.log(err)
    })
      
    }else{
      this._userService.editUser(this.user).subscribe(
      response => {
        this.valid = 'confirm'
        this.resetValid()
      },
      err => {
        this.err = err
        this.valid = 'correoFalse'
      }
    )
    }
    
  }

  fileChangeEvent(fileInput:any){
    let filesToUpload = fileInput.target.files[0]
    console.log(filesToUpload)
    const formData = new FormData()
        formData.append('file', filesToUpload)
        formData.append('upload_preset', 'senntio')
        formData.append('cloud_name', 'sennt03')
    this.img = formData
    this.sub_img = true

  }

  noConfirEliminarCuenta(){
    this.valid = 'noConfirmEliminarCuenta'
  }

  eliminarCuenta(){
    this.valid = 'EliminandoCuenta'
    let id = localStorage.getItem('usl')
    localStorage.removeItem('usl')
    localStorage.removeItem('tk')
    this._userService.deleteCuenta(id).subscribe(
      response => {
        location.reload()
      },
      err => {
        console.log(err)
      }
    )
  }

}
