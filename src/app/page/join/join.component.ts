import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  inputUser: User = new User();

  constructor() { }

  ngOnInit(): void {
    this.inputUser = new User()
  }

  joinOk() {
    console.log(this.inputUser);
  }

}
