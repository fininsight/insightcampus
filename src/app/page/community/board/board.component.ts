import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public board_seq: any;

  constructor(private route: ActivatedRoute) { 
    route.params.subscribe(val => {
      this.board_seq = val.board_seq;
    });
  }

  ngOnInit() {
    console.log(this.board_seq);
  }

}
