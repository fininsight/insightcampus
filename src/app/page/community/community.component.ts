import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from '../core/models/datatable';
import { CommunityService } from '../core/services/community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  boards = new DataTable();

  constructor(private communityService: CommunityService,
              private router: Router) {
    this.boards.pageNumber = 1;
    this.boards.size = 20;

    this.communityService.getBoards(this.boards).subscribe(data => {
      this.boards = data;
    });
  }

  ngOnInit() {
  }

  gotoPage(board_seq) {
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
