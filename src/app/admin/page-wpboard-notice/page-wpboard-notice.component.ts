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

  left_uid = null;
  right_uid = null;

  wpboardnotices = new DataTable();
  wpboardnoticelibrarys = new DataTable();
  wpboardnoticereviews = new DataTable();

  wpboardnoticeLoading = true;
  wpboardnoticelibraryLoading = true;
  wpboardnoticereviewLoading = true;

  constructor(private wpboardnoticeService: WpboardNoticeService,
              private userService: UserService,
              private message: NzMessageService,
              public datepipe: DatePipe) {
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

  getWpboardNotices() {
    this.wpboardnoticeService.getWpboardNotices(this.wpboardnotices).subscribe(data => {
      this.wpboardnotices = data;
      this.wpboardnoticeLoading = false;
      this.left_uid = null;
    });
  }

  getWpboardNoticeLibrarys() {
    this.wpboardnoticeService.getWpboardNoticeLibrarys(this.wpboardnoticelibrarys).subscribe(data => {
      this.wpboardnoticelibrarys = data;
      this.wpboardnoticelibraryLoading = false;
      this.right_uid = null;
    });
  }

  getWpboardNoticeReviews() {
    this.wpboardnoticeService.getWpboardNoticeReviews(this.wpboardnoticereviews).subscribe(data => {
      this.wpboardnoticereviews = data;
      this.wpboardnoticereviewLoading = false;
      this.right_uid = null;
    });
  }

  selectRightGrid(param) {
    console.log(param.uid)
    this.right_uid = param.uid;
  }

  selectLeftGrid(param) {
    this.left_uid = param.uid;
  }

  moveLibrarys() {
    if (this.left_uid === null) {
      this.message.create('error', '왼쪽 그리드를 선택해주세요.');
    } else {
      this.wpboardnoticeService.updateWpboardNotice(this.left_uid, '자료실').subscribe(data => {
        this.getWpboardNotices();
        this.getWpboardNoticeLibrarys();
        this.message.create('success', '이동이 완료되었습니다.');
      });
    }
  }

  moveReviews() {
    if (this.left_uid === null) {
      this.message.create('error', '왼쪽 그리드를 선택해주세요.');
    } else {
      this.wpboardnoticeService.updateWpboardNotice(this.left_uid, '수강생후기').subscribe(data => {
        this.getWpboardNotices();
        this.getWpboardNoticeReviews();
        this.message.create('success', '이동이 완료되었습니다.');
      });
    }
  }

  deleteNotice() {
    if (this.right_uid === null) {
      this.message.create('error', '오른쪽 그리드를 선택해주세요.');
    } else {
      this.wpboardnoticeService.initWpboardNotice(this.right_uid).subscribe(data => {
        this.getWpboardNotices();
        this.getWpboardNoticeLibrarys();
        this.getWpboardNoticeReviews();
        this.message.create('success', '최신글에서 제외가 완료되었습니다.');
      });
    }
  }
}
