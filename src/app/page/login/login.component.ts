import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordVisible = false;

  user = {
    user_id: '',
    user_pw: ''
  };

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  loginKeyDown(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  login() {
    this.authService.login(this.user).subscribe(data => {
      this.user.user_id = '';
      this.user.user_pw = '';
      this.router.navigate(['/']);
    }, error => {
    });
  }

}
