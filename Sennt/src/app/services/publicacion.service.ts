import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  public url

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url
   }

  addPublicacion(publi){
      return this._http.post(this.url+'add-publicacion', publi)
  }

  getPublicacion(id){
    return this._http.get(this.url+'get-publicacion/'+id)
  }

  getPersonalPublicaciones(id){
      return this._http.get(this.url+'get-personal-publicaciones/'+id)
  }

  deletePublicacion(id){
    return this._http.delete(this.url+'delete-publicacion/'+id)
  }

  editPublicacion(publi){
    return this._http.put(this.url+'edit-publicacion/'+publi._id, publi)
  }
}
