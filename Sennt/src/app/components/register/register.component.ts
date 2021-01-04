import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User
  public userLog: any
  public valid: string
  public err: any

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { 
    this.user = new User('', '', '', '', '')
  }

  ngOnInit() {
  if(this._authService.loggedIn()){
      this._router.navigate(['/inicio'])
    }
  }

  signup(){
    document.querySelector('#btn-register').innerHTML = 'Cargando...'
    let name = this.user.name
    let email = this.user.email
    let password = this.user.password
    let gmail = '@gmail.com'
    let hotmail = '@hotmail.com'
    let si = 0
    if(name.length <= 15){
      if(name.length == 0){
        this.valid = 'incompleto'
        document.querySelector('#btn-register').innerHTML = 'Registrarme'
      }else{
        for (let i = 0; i < email.length; i++) {
        if(email.substring(i) == gmail || email.substring(i) == hotmail){
          si = 1
        }
      }
      if(si == 1){
        if(email.length == 0){
        this.valid = 'incompleto'
        document.querySelector('#btn-register').innerHTML = 'Registrarme'
      }else{
        if(password.length == 0){
          this.valid = 'incompleto'
          document.querySelector('#btn-register').innerHTML = 'Registrarme'
        }else{
          this.registrar()
        }
      }
      }else{
        this.valid = 'emailInco'
        document.querySelector('#btn-register').innerHTML = 'Registrarme'
      }

      }
      
    }else{
      this.valid = 'nameFalse'
      document.querySelector('#btn-register').innerHTML = 'Registrarme'
    }
    
  }

  registrar(){
    document.querySelector('#btn-register').innerHTML = 'Cargando...'
    this._authService.register(this.user).subscribe(
      response => {
        this.userLog = response
        localStorage.setItem('tk', this.userLog.token)
        localStorage.setItem('usl', this.userLog.user._id)
        this._router.navigate(['/inicio'])
      },
      err => {
        this.err = err
        this.valid = 'correoFalse'
        document.querySelector('#btn-register').innerHTML = 'Registrarme'
      }
    )
  }
}
