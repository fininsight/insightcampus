import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from '../core/models/datatable';
import { Community } from '../core/models/community';
import { CommunityService } from '../core/services/community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  boards = new DataTable();
  community = new Community();

  constructor(private communityService: CommunityService,
              private router: Router) {
    this.boards.pageNumber = 1;
    this.boards.size = 20;

    this.communityService.getBoards(this.boards).subscribe(data => {
      this.boards = data;
      console.log(this.boards.data);
    });
  }

  ngOnInit() {
  }

  gotoPage(board_seq, view_count) {
    this.community.board_seq = board_seq;
    this.community.view_count = view_count;
    this.communityService.increaseViewCount(this.community).subscribe(data => {
      console.log(data);
    })
    this.router.navigate(['/board/' + board_seq]);
  }

  convertDateType(dateStr) {
    const dateDate = new Date(dateStr);
    let dateConvert = "";

    dateConvert += (dateDate.getFullYear() + ". ");
    dateConvert += (dateDate.getMonth()+1 + ". ");
    dateConvert += dateDate.getDate();

    return dateConvert;
  }

}
