import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  seq = null;
  password = null;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router)   {

    this.seq = this.route.snapshot.queryParamMap.get('seq');
    this.password = this.route.snapshot.queryParamMap.get('password');

    if (this.seq !== null) {
      console.log('여기');
      this.user.user_id = this.seq;
      this.user.user_pw = this.password;
      this.familyLogin();
    }

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
      this.router.navigate(['/admin/family-addfare']);
    }, error => {
    });
  }


}
