import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url
  public cloudinary_url = 'https://api.cloudinary.com/v1_1/sennt03/image/upload'

  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.url
  }

  getUserId(){
    return localStorage.getItem('usl')
  }

  getUser(id){
    return this._http.get(this.url+'get-user/'+id)
  }

  getPublicaciones(){
    return this._http.get(this.url+'get-publicaciones')
  }

  editUser(user){
    let id = localStorage.getItem('usl')
    return this._http.put(this.url+'edit-user/'+id, user)
  }

  getUsers(){
    return this._http.get(this.url+'get-users')
  }

  getUserByName(name){
    return this._http.get(this.url+'get-user-name/'+name)
  }

  deleteCuenta(id){
    return this._http.delete(this.url+'delete-user/'+id)
  }
  
}
