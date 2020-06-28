import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  passwordVisible = false;

  user: User = {
    user_id: '',
    user_pw: ''
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  login() {

    this.authService.login(this.user).subscribe(data => {
      this.user.user_id = '';
      this.user.user_pw = '';
    }, error => {
    });
  }

}
