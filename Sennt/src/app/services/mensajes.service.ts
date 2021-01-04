import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  public url

  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.url
  }

  addMnesaje(mensaje){
    return this._http.post(this.url+'add-mensaje', mensaje)
  }

  getRecibidos(name){
    return this._http.get(this.url+'get-recibidos/'+name)
  }

  getEnviados(name){
    return this._http.get(this.url+'get-enviados/'+name)
  }

  deleteMensaje(id){
    return this._http.delete(this.url+'delete-mensaje/'+id)
  }

  editMensaje(mensaje){
    return this._http.put(this.url+'edit-mensaje/'+mensaje._id, mensaje)
  }

  getMensaje(id){
    return this._http.get(this.url+'get-mensaje/'+id)
  }
}
