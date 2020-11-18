import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../../core/services/community.service';
import { Community } from '../../core/models/community';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public board_seq: any;
  public board: Community = new Community();

  constructor(private communityService: CommunityService,
              private route: ActivatedRoute) { 
    
    route.params.subscribe(val => {
      this.board_seq = val.board_seq;
    });

    this.communityService.getBoard(this.board_seq).subscribe(data => {
      this.board = data;
    })
  }

  ngOnInit() { }

}
