import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'minav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public userId: any
  public user: any

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this._userService.getUserId()
    this._userService.getUser(this.userId).subscribe(
      response => {
        this.user = response
      },
      err => {
        
      }
    )
  }

  logout(){
    this._authService.logout()
  }

}
