import { Component, OnInit, TemplateRef, ViewChildren, QueryList, ElementRef } from '@angular/core';
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
  @ViewChildren('class') classes: QueryList<ElementRef>;

  public class_seq: any;
  noticeType = 0;
  froalaValue: string = "";
  templates = "";

  edit = {};
  noticeTitle = {};

  notices: DataTable = new DataTable();
  notice: ClassNotice = new ClassNotice();


  public option = {
    imageUploadURL: 'http://localhost:5000/api/froala/upload/notice',
    imageUploadMethod: 'POST',
    imageMaxSize: 5 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],

    events: {
      contentChanged: () => {
        try {
          for (let i = 0; i < this.classes['_results'].length; i++) {
            if(this.noticeType == 1) 
              this.templates = this.classes['_results'][i].nativeElement.children[2].children[0].innerHTML;
            for(let i=0; i<this.notices.data.length; i++) {
              if(this.edit[this.notices.data[i].class_notice_seq] == 1) {
                this.templates = this.classes['_results'][i].nativeElement.children[2].children[0].innerHTML;
                break;
              }
            }
          }
        } catch {

        }
      }
    }
  }

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
    this.classNoticeService.getClassNotices(this.notices, this.class_seq).subscribe(data => {
      this.notices = data;
      console.log(this.notices);
      for(let i=0; i<data.data.length; i++) {
        this.edit[data.data[i].class_notice_seq] = 0;
        this.noticeTitle[data.data[i].class_notice_seq] = data.data[i].title;
      }
    })
  }

  write() {
    this.noticeType = 1;
  }

  writeCancel() {
    this.noticeType = 0;
  }

  writeOK() {
    this.notice.class_seq = this.class_seq;
    this.notice.parent_seq = 1;
    this.notice.content = this.templates;
    this.classNoticeService.addClassNotice(this.notice).subscribe(data => {
      this.getClassNotices();
      this.noticeType = 0;
      this.froalaValue = "";
      this.notice = new ClassNotice();
    });
  }

  editAble(class_notice_seq: number) {
    this.edit[class_notice_seq] = 1;
  }

  cancle(class_notice_seq: number) {
    this.edit[class_notice_seq] = 0;
  }

  deleteClassNotice(class_notice_seq: number) {
    if (confirm("이 글을 정말 지우시겠습니까?") === true) {
      this.classNoticeService.deleteClassNotice(class_notice_seq).subscribe(data => {
        this.getClassNotices();
      });
    }
  }

  editClassNotice(class_notice_seq: number) {
    for(let i=0; i<this.notices.data.length; i++) {
      if(class_notice_seq == this.notices.data[i].class_notice_seq) {
        this.notices.data[i].title = this.noticeTitle[class_notice_seq];
        this.notices.data[i].content = this.templates;

        this.classNoticeService.updateClassNotice(this.notices.data[i], class_notice_seq).subscribe(data => {
          this.getClassNotices();
        });
        this.cancle(class_notice_seq);
      }
    }
  }



}
