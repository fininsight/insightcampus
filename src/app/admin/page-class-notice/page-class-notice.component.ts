import { Component, OnInit } from '@angular/core';
import { ClassNoticeService } from '../core/services/class-notice.service'
import { DataTable } from '../core/models/datatable';
import { ClassNotice } from '../core/models/class-notice'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-page-class-notice',
  templateUrl: './page-class-notice.component.html',
  styleUrls: ['./page-class-notice.component.css']
})
export class PageClassNoticeComponent implements OnInit {

  notices = new DataTable();

  selectedNotice: ClassNotice = new ClassNotice();

  popupNotice: ClassNotice = new ClassNotice();

  isNoticeAdd = false;
  isNoticeUpdate = false;
  isNoticeContent = false;

  noticeLoading = true;

  sortValue: string | null = null;
  sortKey: string | null = null;

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
  }

  constructor(private classNoticeService: ClassNoticeService,
              private modal: NzModalService,
              private message: NzMessageService) {
                this.notices.pageNumber = 1;
                this.notices.size = 10;

                this.getClassNotice();
               }

  ngOnInit(): void {
  }

  getClassNotice() {
    this.classNoticeService.getAllClassNotices(this.notices).subscribe(data => {
      this.notices = data;
      this.noticeLoading = false;
      this.selectedNotice = new ClassNotice();
    });
  }

  selectNotice(param) {
    this.selectedNotice = param;
  }

  noticeContent() {
    this.popupNotice = new ClassNotice();
    this.isNoticeContent = true;
  }

  noticeContentOk() : void {
    this.isNoticeContent = false;
  }

  noticeAdd() {
    this.message.create('warning', '아직 기능이 구현되지 않았습니다.');
  }

  noticeAddOk() : void {

  }

  noticeUpdate() {
    this.message.create('warning', '아직 기능이 구현되지 않았습니다.');
  }

  noticeUpdateOk() : void {

  }

  noticeDelete() {
    this.message.create('warning', '아직 기능이 구현되지 않았습니다.');
  }

  popupCancel() : void {
    this.isNoticeAdd = false;
    this.isNoticeUpdate = false;
    this.isNoticeContent = false;
  }

}
