import { Component, OnInit, ViewChildren, QueryList, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassQnaService } from 'src/app/admin/core/services/class-qna.service';
import { DataTable } from '../../../core/models/datatable';
import { ClassQna } from 'src/app/admin/core/models/class-qna';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-detail-qna',
  templateUrl: './detail-qna.component.html',
  styleUrls: ['./detail-qna.component.css']
})
export class DetailQnaComponent implements OnInit {
  @ViewChildren('class') classes: QueryList<ElementRef>;

  public class_seq: any;
  questionType = 0;
  edit = {};
  reply = {};
  replyEdit = {};
  qnaTitle = {};
  qnaContent = {};
  qnaReply = {};

  qnaes: DataTable = new DataTable();
  qna: ClassQna = new ClassQna();

  public option = {
    imageUploadURL: 'http://localhost:5000/api/froala/upload/qna',
    imageUploadMethod: 'POST',
    imageMaxSize: 5 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],

    events: {
      contentChanged: () => {
        try {
          for (let i = 0; i < this.classes['_results'].length; i++) {
            if(this.questionType == 1)
              this.qna.content = this.classes['_results'][i].nativeElement.children[2].children[0].innerHTML;

            for(let i=0; i<this.qnaes.data.length; i++) {
              if(this.edit[this.qnaes.data[i].class_qna_seq] == 1) {
                this.qnaContent[this.qnaes.data[i].class_qna_seq] = this.classes['_results'][i].nativeElement.children[2].children[0].innerHTML;
                break;
              }   
            }
            for(let i=0; i<this.qnaes.data.length; i++) {
              if(this.replyEdit[this.qnaes.data[i].class_qna_seq] == 1) {
                this.qnaReply[this.qnaes.data[i].class_qna_seq] = this.classes['_results'][i].nativeElement.children[2].children[0].innerHTML;
                break;
              }   
            }
          }
        } catch {

        }
      }
    }
  }

  constructor(private classQnaService: ClassQnaService,
              private route: ActivatedRoute,
              private modal: NzModalService,
              private message: NzMessageService
              ) {

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
    this.classQnaService.getClassQnaes(this.qnaes, this.class_seq).subscribe(data => {
      this.qnaes = data;
      for(let i=0; i<data.data.length; i++) {
        this.edit[data.data[i].class_qna_seq] = 0;
        this.reply[data.data[i].class_qna_seq] = 0;
        this.replyEdit[data.data[i].class_qna_seq] = 0;
        this.qnaTitle[data.data[i].class_qna_seq] = data.data[i].title;
        this.qnaContent[data.data[i].class_qna_seq] = data.data[i].content;
        this.qnaReply[data.data[i].class_qna_seq] = data.data[i].reply;
        console.log(data.data[i].content);
      }
    });
  }

  deleteClassQna(class_qna_seq) {
    console.log(class_qna_seq);
    if (confirm("이 글을 정말 지우시겠습니까?") === true) {
      this.classQnaService.deleteQna(class_qna_seq).subscribe(data => {
        this.getClassQnaes();
      });
      
    }
  }

  isEndOfPage() {
    if (this.qnaes.pageNumber === this.qnaes.totalPages)
      return true;
    else if (!this.qnaes.data.length)
      return true;
    else
      return false;
  }

  createQuestionWrite() {
    this.questionType = 1;
  }

  writeOK() {
    this.qna.class_seq = this.class_seq;
    console.log(this.qna);
    this.classQnaService.addQna(this.qna).subscribe(data => {
      this.getClassQnaes();
      this.message.success('글쓰기가 완료되었습니다.');
      this.questionType = 0;
    });
  }

  writeCancel() {
    this.questionType = 0;
  }

  editAble(class_qna_seq) {
    this.edit[class_qna_seq] = 1;
  }

  complete(class_qna_seq) {
    for(let i=0; i<this.qnaes.data.length; i++) {
      if(class_qna_seq == this.qnaes.data[i].class_qna_seq) {
        this.qnaes.data[i].title = this.qnaTitle[class_qna_seq];
        this.qnaes.data[i].content = this.qnaContent[class_qna_seq];
        this.qnaes.data[i].reply = this.qnaReply[class_qna_seq];
        this.classQnaService.updateQna(this.qnaes.data[i], class_qna_seq).subscribe(data => {
          this.getClassQnaes();
        });
        this.cancle(class_qna_seq);
        break;
      }
    }
  }

  cancle(class_qna_seq) {
    this.edit[class_qna_seq] = 0;
    this.reply[class_qna_seq] = 0;
    this.replyEdit[class_qna_seq] = 0;
  }

  replyAble(class_qna_seq) {
    this.reply[class_qna_seq] = 1;
  }

  replyEditAble(class_qna_seq) {
    this.replyEdit[class_qna_seq] = 1;
  }

}
