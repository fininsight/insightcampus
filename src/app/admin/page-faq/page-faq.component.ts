import { Component, OnInit, SecurityContext } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FaqService } from '../core/services/faq.service';
import { Faq } from '../core/models/faq';
import { User } from '../core/models/user'
import { DataTable } from '../core/models/datatable';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-faq',
  templateUrl: './page-faq.component.html',
  styleUrls: ['./page-faq.component.css']
})
export class PageFaqComponent implements OnInit {
  users = new DataTable();
  user_id;

  faqs = new DataTable();

  faqLoading = true;
  isFaqAdd = false;
  isFaqUpdate = false;

  selectedFaq: Faq = new Faq();
  popupFaq: Faq = new Faq();

  constructor(private faqService: FaqService,
    private authService: AuthService,
    private userService: UserService,
    private modal: NzModalService,
    private message: NzMessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute) 
    { 
      this.faqs.pageNumber = 1;
      this.faqs.size = 10;
      this.getFaqs();
    }

  ngOnInit() {}


  loggedInfo() {
    var userData = this.faqService.getUserId();
    
    this.userService.getUsers(this.users, {
      name: '',
      email: ''
    }).subscribe(data => {
      this.users = data;
      data.data.forEach(element => {
        if(userData['nameid'] === element.user_id) { 
          this.user_id = element.user_seq;
        }
     });
    });
  }

  getFaqs() {
    this.faqService.getFaqs(this.faqs).subscribe(data => {
      this.faqs = data;
      this.faqLoading = false;
      this.selectedFaq = new Faq();
    });
    this.loggedInfo();
  }

  getFaq() {
    this.faqService.getFaq(this.faqs, this.selectedFaq.faq_seq).subscribe(data => {
      this.faqs = data;
      this.faqLoading = false;
      this.selectedFaq = new Faq();
    });
  }

  selectFaq(param) {
    this.selectedFaq = param;
  }

  faqAdd() {
    this.popupFaq = new Faq();
    this.isFaqAdd = true;
  }

  faqAddOk() : void {
    this.faqService.addFaq(this.popupFaq).subscribe(data => {
      this.getFaqs();
      this.selectedFaq = new Faq();
      this.isFaqAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
  }

  faqUpdate() {
    this.popupFaq = new Faq();
    this.popupFaq.faq_seq = this.selectedFaq.faq_seq;
    this.popupFaq.faq_nm = this.selectedFaq.faq_nm;
    this.popupFaq.content = this.selectedFaq.content;
    this.popupFaq.upd_dt = this.selectedFaq.upd_dt;
    this.popupFaq.upd_user = this.selectedFaq.upd_user;
    this.isFaqUpdate = true;
  }

  faqUpdateOk() : void {
    this.faqService.updateFaq(this.popupFaq).subscribe(data => {
      this.getFaqs();
      this.isFaqUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
  }

  popupCancel(): void{
    this.isFaqAdd = false;
    this.isFaqUpdate = false;
  }

  faqDelete() {
    this.modal.confirm({
      nzTitle: '삭제하시겠습니까?',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.faqService.deleteFaq(this.selectedFaq.faq_seq).subscribe(data => {
          this.getFaqs();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }
}
