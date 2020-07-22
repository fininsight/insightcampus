import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassNoticeService } from 'src/app/admin/core/services/class-notice.service';
import { ClassNotice } from 'src/app/admin/core/models/class-notice';
import { DataTable } from '../../../core/models/datatable';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-detail-notice',
  templateUrl: './detail-notice.component.html',
  styleUrls: ['./detail-notice.component.css']
})
export class DetailNoticeComponent implements OnInit {

  public class_seq: any;

  notices: DataTable = new DataTable();
  popupNotice: ClassNotice = new ClassNotice();
  buttonLoading = false;

  tplmodal?: NzModalRef;

  constructor(private classNoticeService: ClassNoticeService,
              private route: ActivatedRoute,
              private modal: NzModalService) {
    
    route.params.subscribe(val => {
      this.class_seq = val.class_seq;
    });

    this.notices.pageNumber = 1;
    this.notices.size = 10;

    this.getClassNotices();
  }

  ngOnInit() {
  }

  getClassNotices(){
    this.buttonLoading = true;
    this.classNoticeService.getClassNotices(this.notices, this.class_seq).subscribe(data => {
      this.notices = data;
      console.log(this.notices)
      if (this.isEndOfPage()) this.updateFinishBtn();
      this.buttonLoading = false;
    })
  }

  getMoreNotices() {
    this.buttonLoading = true;
    if (this.notices.pageNumber < this.notices.totalPages) {
      this.notices.pageNumber += 1;
      this.classNoticeService.getClassNotices(this.notices, this.class_seq).subscribe(data => {
        this.notices.data = this.notices.data.concat(data.data);
        if (this.isEndOfPage()) this.updateFinishBtn();
        this.buttonLoading = false;
      })
    } else {
      throw new Error('Invalid page number!');
    }
  }

  isEndOfPage() {
    if (this.notices.pageNumber === this.notices.totalPages)
      return true;
    else if (!this.notices.data.length)
      return true;
    else
      return false;
  }

  updateFinishBtn() {
    const btn = document.querySelector('.more-button');
    btn.setAttribute('disabled', '');
    btn.querySelector('span').innerText = '끝';
  }

  popupNoticeOpen(header: TemplateRef<{}>, body: TemplateRef<{}>, footer: TemplateRef<{}>){
    this.popupNotice = new ClassNotice();
    this.tplmodal = this.modal.create({
      nzWidth: 600,
      nzTitle: header,
      nzContent: body,
      nzFooter: footer,
      nzClosable: false,
    });
  }

  popupNoticeClose() {
    this.tplmodal.destroy();
  }
}
