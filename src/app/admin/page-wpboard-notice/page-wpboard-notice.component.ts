import { Component, OnInit, SecurityContext } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WpboardNoticeService } from '../core/services/wpboardnotice.service';
import { WpboardNotice } from '../core/models/wpboardnotice';
import { User } from '../core/models/user'
import { DataTable } from '../core/models/datatable';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-wpboard-notice',
  templateUrl: './page-wpboard-notice.component.html',
  styleUrls: ['./page-wpboard-notice.component.css']
})
export class PageWpboardNoticeComponent implements OnInit {
  users = new DataTable();
  user_id;

  wpboardnotices = new DataTable();
  wpboardnoticelibrarys = new DataTable();
  wpboardnoticereviews = new DataTable();

  wpboardnoticeLoading = true;
  wpboardnoticelibraryLoading = true;
  wpboardnoticereviewLoading = true;

  constructor(private wpboardnoticeService: WpboardNoticeService,
    private authService: AuthService,
    private userService: UserService,
    private modal: NzModalService,
    private message: NzMessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute) 
    {
      this.wpboardnotices.pageNumber = 1;
      this.wpboardnotices.size = 10;
      this.wpboardnoticelibrarys.pageNumber = 1;
      this.wpboardnoticelibrarys.size = 5;
      this.wpboardnoticereviews.pageNumber = 1;
      this.wpboardnoticereviews.size = 5;

      this.getWpboardNotices();
      this.getWpboardNoticeLibrarys();
      this.getWpboardNoticeReviews();
    }

  ngOnInit() {}


  loggedInfo() {
    var userData = this.wpboardnoticeService.getUserId();
    
    this.userService.getUsers(this.users).subscribe(data => {
      this.users = data;
      data.data.forEach(element => {
        if(userData['nameid'] === element.user_id) { 
          this.user_id = element.user_seq;
        }
     });
    });
  }

  getWpboardNotices() {
    this.wpboardnoticeService.getWpboardNotices(this.wpboardnotices).subscribe(data => {
      this.wpboardnotices = data;
      this.wpboardnoticeLoading = false;
    });
    this.loggedInfo();
  }

  getWpboardNoticeLibrarys() {
    this.wpboardnoticeService.getWpboardNoticeLibrarys(this.wpboardnoticelibrarys).subscribe(data => {
      this.wpboardnoticelibrarys = data;
      this.wpboardnoticelibraryLoading = false;
    });
    this.loggedInfo();
  }

  getWpboardNoticeReviews() {
    this.wpboardnoticeService.getWpboardNoticeReviews(this.wpboardnoticereviews).subscribe(data => {
      this.wpboardnoticereviews = data;
      this.wpboardnoticereviewLoading = false;
    });
    this.loggedInfo();
  }

}
