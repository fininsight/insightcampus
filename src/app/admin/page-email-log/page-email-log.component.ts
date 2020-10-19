import { Component, OnInit, Injectable, SecurityContext } from '@angular/core';
import { EmailLogService } from '../core/services/emaillog.service';
import { DataTable } from '../core/models/datatable';
import { EmailLog } from '../core/models/emaillog'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-page-email-log',
  templateUrl: './page-email-log.component.html',
  styleUrls: ['./page-email-log.component.css']
})
export class PageEmailLogComponent implements OnInit {

  phoneNumber = "";
  emaillogs = new DataTable();
  selectedEmailLog: EmailLog = new EmailLog();
  popupEmailLog: EmailLog = new EmailLog();

  isEmailLogAdd = false;
  isEmailLogUpdate = false;


  emaillogLoading = true;


  constructor(private userService: EmailLogService,
    private authService: AuthService,
    private modal: NzModalService,
    private message: NzMessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute) 
    { 
      this.emaillogs.pageNumber = 1;
      this.emaillogs.size = 10;
      this.getEmailLogs();
    }

  ngOnInit() {
   
  }

  getEmailLogs() {
    this.userService.getEmailLogs(this.emaillogs).subscribe(data => {
      this.emaillogs = data;
      this.emaillogLoading = false;
      this.selectedEmailLog = new EmailLog();
    });
  }

  selectEmailLog(param) {
    this.selectedEmailLog = param;
  }

  emaillogAdd() {
    this.popupEmailLog = new EmailLog();
    this.popupEmailLog.use_yn = 1;
    let date = new Date();
    this.popupEmailLog.reg_date = date;
    this.isEmailLogAdd = true;
  }

  emaillogAddOk(): void {
    this.userService.addEmailLog(this.popupEmailLog).subscribe(data => {
      this.getEmailLogs();
      this.isEmailLogAdd = false;
      this.message.create('success', '메일 추가가 완료되었습니다.');
    })
  }

  emaillogUpdate() {
    this.popupEmailLog = new EmailLog();
    this.popupEmailLog.email_log_seq = this.selectedEmailLog.email_log_seq;
    this.popupEmailLog.subject = this.selectedEmailLog.subject;
    this.popupEmailLog.contents = this.selectedEmailLog.contents;
    this.popupEmailLog.to = this.selectedEmailLog.to;
    let date = new Date();
    this.popupEmailLog.reg_date = date;
    //this.popupEmailLog.use_yn = 1;
    this.isEmailLogUpdate = true;
  }
  
  emaillogUpdateOk() : void {
    this.userService.updateEmailLog(this.popupEmailLog, this.popupEmailLog.email_log_seq).subscribe(data => {
      this.getEmailLogs();
      this.isEmailLogUpdate = false;
      this.message.create('success', '메일 수정이 완료되었습니다.');
    })
  }
  
  emaillogDelete() {
    this.modal.confirm({
      nzTitle: '메일을 삭제하시겠습니까?',
      nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.userService.deleteEmailLog(this.selectedEmailLog.email_log_seq).subscribe(data => {
          this.getEmailLogs();
          this.message.create('success', '메일 삭제가 완료되었습니다.');
        })
      }
    });
  }
  
  popupCancel() : void {
    this.isEmailLogAdd = false;
    this.isEmailLogUpdate = false;
  }



  


}
