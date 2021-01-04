import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../services/global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { 
    this.url = Global.url
  }

  register(user){
    return this._http.post(this.url+'signup', user)
  }

  login(user){
    return this._http.post(this.url+'signin', user)
  }

  loggedIn(){
    if(localStorage.getItem('tk')){
      return true
    }else{
      return false
    }
  }

  getToken(){
    return localStorage.getItem('tk')
  }

  logout(){
    localStorage.removeItem('usl')
    localStorage.removeItem('tk')
    this._router.navigate(['/login'])
  }
}
