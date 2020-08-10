import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  inputUser: User = new User();
  pwConfirm: String = '';
  terms: boolean = false;
  privacy: boolean = false;
  marketing: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.inputUser = new User()
  }

  joinOk() {

    // check null value
    if (!this.inputUser.user_id) {
      document.querySelector('#id-wrapper').scrollIntoView();
      alert("ID를 입력해주세요.");
      return;
    } else if (!this.inputUser.email) {
      document.querySelector('#email-wrapper').scrollIntoView();
      alert("E-mail을 입력해주세요.");
      return;
    } else if (!this.inputUser.name) {
      document.querySelector('#name-wrapper').scrollIntoView();
      alert("이름을 입력해주세요.");
      return;
    } else if (!this.inputUser.user_pw) {
      document.querySelector('#password-wrapper').scrollIntoView();
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // check password and password confirm
    if (this.pwConfirm !== this.inputUser.user_pw) {
      document.querySelector('#password-wrapper').scrollIntoView()
      alert("비밀번호 확인이 일치하지 않습니다.")
      return;
    }

    // check conditions
    if (!this.terms) {
      document.querySelector('#termsOfUse').scrollIntoView();
      alert("이용약관에 동의하셔야 합니다.")
      return;
    } else if (!this.privacy) {
      document.querySelector('#privacy').scrollIntoView()
      alert("개인정보 수집이용에 동의하셔야 합니다.")
      return;
    } else {
      if (this.marketing)
        this.inputUser.ad = 1;
      else
        this.inputUser.ad = 0;
    }

    this.authService.join(this.inputUser).subscribe(data => {
      alert("회원가입이 완료되었습니다.");
      location.replace('/');
    })
  }

  passwordCheck() {
    const message = document.getElementById("password-confirm-message");
    if (this.pwConfirm === this.inputUser.user_pw) {
      message.innerText = "비밀번호가 일치합니다."
      message.style.color = "green";
    } else {
      message.innerText = "비밀번호가 일치하지 않습니다.";
      message.style.color = "red";
    }
  }

}
