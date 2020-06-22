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

  constructor() { }

  ngOnInit(): void {
  }

}
