import { Component, OnInit, SecurityContext } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FinWorkService } from '../core/services/fin-work.service';
import { FinWorkDetailService } from '../core/services/fin-work-detail.service';
import { FinWork } from '../core/models/fin-work';
import { FinWorkDetail } from '../core/models/fin-work-detail';
import { User } from '../core/models/user'
import { DataTable } from '../core/models/datatable';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-fin-work',
  templateUrl: './page-fin-work.component.html',
  styleUrls: ['./page-fin-work.component.css']
})
export class PageFinWorkComponent implements OnInit {
  users = new DataTable();
  user_id;

  finWorks = new DataTable();

  finWorkLoading = true;
  isFinWorkAdd = false;
  isFinWorkUpdate = false;

  selectedFinWork: FinWork = new FinWork();
  popupFinWork: FinWork = new FinWork();

  finWorkDetails = new DataTable();

  finWorkDetailLoading = true;
  isFinWorkDetailAdd = false;
  isFinWorkDetailUpdate = false;

  selectedFinWorkDetail: FinWorkDetail = new FinWorkDetail();
  popupFinWorkDetail: FinWorkDetail = new FinWorkDetail();

  constructor(private finWorkService: FinWorkService,
    private finWorkDetailService: FinWorkDetailService,
    private authService: AuthService,
    private userService: UserService,
    private modal: NzModalService,
    private message: NzMessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute) 
    { 
      this.finWorks.pageNumber = 1;
      this.finWorks.size = 10;
      this.getFinWorks();

      this.finWorkDetails.pageNumber = 1;
      this.finWorkDetails.size = 10;
      this.getFinWorkDetails();
    }

  ngOnInit() {}

  getFinWorks() {
    this.finWorkService.getFinWorks(this.finWorks).subscribe(data => {
      this.finWorks = data;
      this.finWorkLoading = false;
      this.selectedFinWork = new FinWork();
    });
  }

  getFinWork() {
    this.finWorkService.getFinWork(this.finWorks, this.selectedFinWork.work_seq).subscribe(data => {
      this.finWorks = data;
      this.finWorkLoading = false;
      this.selectedFinWork = new FinWork();
    });
  }

  selectFinWork(param) {
    this.selectedFinWork = param;
  }

  finWorkAdd() {
    this.popupFinWork = new FinWork();
    this.popupFinWork.work_seq = this.selectedFinWork.work_seq;
    this.isFinWorkAdd = true;
  }

  finWorkAddOk() : void {
    this.finWorkService.addFinWork(this.popupFinWork).subscribe(data => {
      this.getFinWorks();
      this.selectedFinWork = new FinWork();
      this.isFinWorkAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
  }

  finWorkUpdate() {
    this.popupFinWork = new FinWork();
    this.popupFinWork.work_seq = this.selectedFinWork.work_seq;
    this.popupFinWork.work_name = this.selectedFinWork.work_name;
    this.popupFinWork.start_date = this.selectedFinWork.start_date;
    this.popupFinWork.end_date = this.selectedFinWork.end_date;
    this.popupFinWork.expected_sales = this.selectedFinWork.expected_sales;
    this.popupFinWork.expected_purchase = this.selectedFinWork.expected_purchase;
    this.popupFinWork.sales = this.selectedFinWork.sales;
    this.popupFinWork.purchase = this.selectedFinWork.purchase;
    this.isFinWorkUpdate = true;
  }

  finWorkUpdateOk() : void {
    this.finWorkService.updateFinWork(this.popupFinWork).subscribe(data => {
      this.getFinWorks();
      this.isFinWorkUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
  }

  popupCancel(): void{
    this.isFinWorkAdd = false;
    this.isFinWorkUpdate = false;
  }

  finWorkDelete() {
    this.modal.confirm({
      nzTitle: '삭제하시겠습니까?',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.finWorkService.deleteFinWork(this.selectedFinWork.work_seq).subscribe(data => {
          this.getFinWorks();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }

  getFinWorkDetails() {
    this.finWorkDetailService.getFinWorkDetails(this.finWorkDetails).subscribe(data => {
      this.finWorkDetails = data;
      this.finWorkDetailLoading = false;
      this.selectedFinWorkDetail = new FinWorkDetail();
    });
  }

  getFinWorkDetail() {
    this.finWorkDetailService.getFinWorkDetail(this.finWorkDetails, this.selectedFinWorkDetail.work_detail_seq).subscribe(data => {
      this.finWorkDetails = data;
      this.finWorkDetailLoading = false;
      this.selectedFinWorkDetail = new FinWorkDetail();
    });
  }

  selectFinWorkDetail(param) {
    this.selectedFinWorkDetail = param;
  }

  finWorkDetailAdd() {
    this.popupFinWorkDetail = new FinWorkDetail();
    this.popupFinWorkDetail.work_detail_seq = this.selectedFinWorkDetail.work_detail_seq;
    this.popupFinWorkDetail.work_seq = this.selectedFinWork.work_seq;
    this.isFinWorkDetailAdd = true;
  }

  finWorkDetailAddOk(): void {
    this.finWorkDetailService.addFinWorkDetail(this.popupFinWorkDetail).subscribe(data => {
      this.getFinWorkDetails();
      this.selectedFinWorkDetail = new FinWorkDetail();
      this.isFinWorkDetailAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
  }

  finWorkDetailUpdate() {
    this.popupFinWorkDetail = new FinWorkDetail();
    this.popupFinWorkDetail.work_detail_seq = this.selectedFinWorkDetail.work_detail_seq;
    this.popupFinWorkDetail.work_seq = this.selectedFinWorkDetail.work_seq;
    this.popupFinWorkDetail.year = this.selectedFinWorkDetail.year;
    this.popupFinWorkDetail.month = this.selectedFinWorkDetail.month;
    this.popupFinWorkDetail.expected_sales = this.selectedFinWorkDetail.expected_sales;
    this.popupFinWorkDetail.expected_purchase = this.selectedFinWorkDetail.expected_purchase;
    this.popupFinWorkDetail.sales = this.selectedFinWorkDetail.sales;
    this.popupFinWorkDetail.purchase = this.selectedFinWorkDetail.purchase;
    this.isFinWorkDetailUpdate = true;
  }

  finWorkDetailUpdateOk(): void {
    this.finWorkDetailService.updateFinWorkDetail(this.popupFinWorkDetail).subscribe(data => {
      this.getFinWorkDetails();
      this.isFinWorkDetailUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
  }

  popupDetailCancel(): void {
    this.isFinWorkDetailAdd = false;
    this.isFinWorkDetailUpdate = false;
  }

  finWorkDetailDelete() {
    this.modal.confirm({
      nzTitle: '삭제하시겠습니까?',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.finWorkDetailService.deleteFinWorkDetail(this.selectedFinWorkDetail.work_detail_seq).subscribe(data => {
          this.getFinWorkDetails();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }
}
