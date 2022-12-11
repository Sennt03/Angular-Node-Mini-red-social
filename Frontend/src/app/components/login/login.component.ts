import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Global } from '../../services/global';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public url
  public user: User
  public err: any
  public userLog: any
  public incorrect: any

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { 
    this.url = Global.url
    this.user = new User('', '', '', '', '')
  }

  ngOnInit() {
    if(this._authService.loggedIn()){
      this._router.navigate(['/inicio'])
    }
  }

  login(){
    document.querySelector('#btn-login').innerHTML = 'Cargando...'
    this._authService.login(this.user).subscribe(
      response => {
        this.userLog = response
        localStorage.setItem('tk', this.userLog.token)
        localStorage.setItem('usl', this.userLog.user._id)
        this._router.navigate(['/inicio'])
      },
      err => {
        this.err = err
        this.incorrect = this.err.error
        document.querySelector('#btn-login').innerHTML = 'Iniciar sesion'
      }
    )
  }
}
