import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './core/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  passwordVisible = false;

  user = {
    user_id: '',
    user_pw: ''
  };

  name = null;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) {

    this.name = this.route.snapshot.queryParamMap.get('name');
    this.user.user_id = this.name;

  }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loginKeyDown(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  familyLoginKeyDown(event) {
    if (event.key === 'Enter') {
      this.familyLogin();
    }
  }

  login() {
    this.authService.login(this.user).subscribe(data => {
      this.user.user_id = '';
      this.user.user_pw = '';
    }, error => {
    });
  }

  familyLogin() {
    this.authService.familyLogin(this.user).subscribe(data => {
      this.user.user_id = '';
      this.user.user_pw = '';
    }, error => {
    });
  }


}
