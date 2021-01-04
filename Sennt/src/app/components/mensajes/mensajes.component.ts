import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../models/mensaje';
import { UserService } from '../../services/user.service';
import { MensajesService } from '../../services/mensajes.service';
import axios from 'axios'

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  public mensaje: Mensaje
  public usuario: any
  public usuarios: any
  public llegaUsers: any
  public cloudinary_url = 'https://api.cloudinary.com/v1_1/sennt03/image/upload'
  public res: any

  /* Validacion */
  public valid: any
  public valid_publi: any

  /* Imagen */
  public img: any
  public img_url: any
  public sub_img: any = false

  /* Mensajes */
  public llegaRecibidos: any
  public recibidos: Array<any>
  public llegaEnviados: any
  public enviados: any

  /* Nuevos mensaje */
  public inicia: any = true
  public mensajesAnteriores: any
  public numRecibidos: Array<any>
  public NoRecibidos: any
  public NoEnviados: any

  /* Editar y borrar mensajes */
  public mensajeId: any
  public editMensaje: any

  constructor(
    private _userService: UserService,
    private _mensajeService: MensajesService
  ) { 
    this.mensaje = new Mensaje('', '', '', '', '', '', '')
    this.recibidos = new Array()
    this.numRecibidos = new Array()
  }

  ngOnInit() {
    let id = localStorage.getItem('usl')
    this._userService.getUser(id).subscribe(
      response => {
        this.usuario = response
        this._userService.getUsers().subscribe(
          response => {
            let invUsers = response
            this.llegaUsers = invUsers
            this.llegaUsers.reverse()
            this.usuarios = this.llegaUsers
            this.getRecibidos()
            this.getEnviados()
          },
          err => {
            console.log(err)
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }

  recargaRecibidos(){
    setInterval(() => {
      this.getRecibidos()
    }, 3000)
  }

  getRecibidos(){
    this._mensajeService.getRecibidos(this.usuario.name).subscribe(
      response => {
        this.llegaRecibidos = response
        this.llegaRecibidos.reverse()
        this.numRecibidos = this.llegaRecibidos
        if(this.inicia){
          this.recibidos = this.llegaRecibidos
          this.mensajesAnteriores = this.recibidos.length
          this.inicia = false
          this.recargaRecibidos()
        }else if(this.numRecibidos.length > this.mensajesAnteriores){
          this.recibidos = this.llegaRecibidos
        }
        if(this.recibidos.length == 0){
            this.NoRecibidos = true
        }else{
          this.NoRecibidos = false
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  getEnviados(){
    this._mensajeService.getEnviados(this.usuario.name).subscribe(
      response => {
        this.llegaEnviados = response
        this.llegaEnviados.reverse()
        this.enviados = this.llegaEnviados
        if(this.enviados.length == 0){
          this.NoEnviados = true
        }else{
        this.NoEnviados = false
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  resetValid(){
    setTimeout(() => {
      this.valid = false
      this.valid_publi = ''
    }, 3000);
  }

  enviar(){
      this.valid = true
      this.valid_publi = 'Enviando...'
    if(this.mensaje.para == ''){
      this.valid_publi = 'Seleccione para quien se enviara el mensaje'
    }else if(this.mensaje.mensaje == '' && this.sub_img == false){
      this.valid_publi = 'Envie alguna imagen o mensaje porfavor'
    }else{
      this.confirmEnviar()
    }
  }

  async confirmEnviar(){
    if(this.sub_img){
      const res = await axios.post(this.cloudinary_url, this.img, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
      this.img_url = res.data.secure_url
  }
  if(this.sub_img){
    this.mensaje.image = this.img_url
  }
  this.mensaje.de = this.usuario.name
  this.mensaje.imgDe = this.usuario.image
  this._userService.getUserByName(this.mensaje.para).subscribe(
    response => {
      this.res = response
      this.mensaje.imgPara = this.res.image
      this._mensajeService.addMnesaje(this.mensaje).subscribe(
        response => {
          this.valid_publi = 'Mensaje enviado'
          this.mensaje.mensaje = ''
          this.mensaje.para = ''
          this.sub_img = false
          this.img_url = ''          
          this.resetValid()
          this.getEnviados()
        },
        err => {
          console.log(err)
        }
      )
    },
    err => {
      console.log(err)
    }
  )
  }

  imgPre(e){
    let img = e.target.files[0]
    let formData = new FormData()
    formData.append('file', img)
    formData.append('upload_preset', 'senntio')
    formData.append('cloud_name', 'sennt03')
    this.img = formData
    this.sub_img = true
  }

  getMensajeId(id){
    this.mensajeId = id
  }

  borrar(){
    this.valid = true
    this.valid_publi = 'Eliminando..'
    this._mensajeService.deleteMensaje(this.mensajeId).subscribe(
      response => {
        this.valid_publi = 'Eliminada correctamente'
        this.resetValid()
        setTimeout(() => {
          this.getEnviados()
          this.getRecibidos()
        }, 4000)
      },
      err => {
        console.log(err)
      }
    )
  }

  getMensajeEdit(id){
    this._mensajeService.getMensaje(id).subscribe(
      response => {
        this.editMensaje = response
      },
      err => {
        console.log(err)
      }
    )
  }

  editar(){
    this.valid = true
    this.valid_publi = 'Editando mensaje...'
    this._mensajeService.editMensaje(this.editMensaje).subscribe(
      response => {
        this.valid_publi = 'Editada correctamente'
        this.resetValid()
        this.editMensaje = null
        setTimeout(() => {
          this.getEnviados()
          this.getRecibidos()
        }, 4000)
      },
      err => {
        console.log(err)
      }
    )
  }

}
