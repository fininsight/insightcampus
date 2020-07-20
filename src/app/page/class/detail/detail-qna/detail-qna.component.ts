import { Component, OnInit, ViewChildren, QueryList, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassQnaService } from 'src/app/admin/core/services/class-qna.service';
import { DataTable } from '../../../core/models/datatable';
import { ClassQna } from 'src/app/admin/core/models/class-qna';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-detail-qna',
  templateUrl: './detail-qna.component.html',
  styleUrls: ['./detail-qna.component.css']
})
export class DetailQnaComponent implements OnInit {

  public class_seq: any;

  qnaes: DataTable = new DataTable();
  popupQna: ClassQna = new ClassQna();
  buttonLoading: Boolean = false;

  tplmodal?: NzModalRef;

  constructor(private classQnaService: ClassQnaService,
              private route: ActivatedRoute,
              private modal: NzModalService,
              private message: NzMessageService) {

    route.params.subscribe(val => {
      this.class_seq = val.class_seq;
    });

    this.qnaes.pageNumber = 1;
    this.qnaes.size = 10;

    this.getClassQnaes();
  }

  ngOnInit() {
  }

  getClassQnaes() {
    this.buttonLoading = true;
    this.classQnaService.getClassQnaes(this.qnaes, this.class_seq).subscribe(data => {
      this.qnaes = data;
      this.isEndOfPage();
      this.buttonLoading = false;
    });
  }

  getMoreQnaes() {
    this.buttonLoading = true;
    if (this.qnaes.pageNumber < this.qnaes.totalPages) {
      this.qnaes.pageNumber += 1;
      this.classQnaService.getClassQnaes(this.qnaes, this.class_seq).subscribe(data => {
        this.qnaes.data = this.qnaes.data.concat(data.data);
        this.isEndOfPage();
        this.buttonLoading = false;
      })
    } else {
      throw new Error('Invalid page number!');
    }
  }

  isEndOfPage() {
    if (this.qnaes.pageNumber === this.qnaes.totalPages) {
      const btn = document.querySelector('.more-button');
      btn.setAttribute('disabled', '');
      btn.querySelector('span').innerText = '끝';
    }
  }

  createQuestionWrite(header: TemplateRef<{}>, body: TemplateRef<{}>, footer: TemplateRef<{}>) {
    this.popupQna = new ClassQna();
    this.tplmodal = this.modal.create({
      nzWidth: 920,
      nzTitle: header,
      nzContent: body,
      nzFooter: footer,
      nzClosable: false,
    });
  }

  writeOK() {
    this.popupQna.class_seq = this.class_seq;
    this.classQnaService.addQna(this.popupQna).subscribe(data => {
      this.qnaes.pageNumber = 1;
      this.getClassQnaes();
      this.message.success('글쓰기가 완료되었습니다.');
    });
    this.tplmodal.destroy();
  }

  writeCancel() {
    this.tplmodal.destroy();
  }

}
