import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { IncamContractService } from '../core/services/incam-contract.service';
import { IncamAddfare } from '../core/models/incam-addfare';
import { DataTable } from '../core/models/datatable';
import { Subscription } from 'rxjs/internal/Subscription';
import en from '@angular/common/locales/en';
import { HttpClient } from '@angular/common/http';
import { TeacherService } from '../core/services/teacher.service';
import { IncamContract } from '../core/models/incam-contract';

@Component({
  selector: 'app-page-incam-contract',
  templateUrl: './page-incam-contract.component.html',
  styleUrls: ['./page-incam-contract.component.css']
})
export class PageIncamContractComponent implements OnInit {

  gubun = [{'gubun_num':1, 'gubun_val': '강사'}, {'gubun_num':2, 'gubun_val': '멘토'}];
  income_type = [{'income_type_num':1, 'income_type_val': '사업소득'}, {'income_type_num':2, 'income_type_val': '기타소득'}];
  popupGubun = "";
  popupIncomeType = "";

  incamContract = new DataTable();

  selectedIncamContract: IncamContract = new IncamContract();
  popupIncamContract: IncamContract = new IncamContract();

  isIncamAddfareAdd = false;
  isIncamAddfareUpdate = false;

  incamContractLoading = true;

  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  teachers = new DataTable();

  private subscription: Subscription;

  confirmModal?: NzModalRef;

  currencyParser = (value: string) => value.replace(/\$\s?|(,*)/g, '');
  currencyFormatter = (value: string) => {
    if (value === null) {
      return null;
    } else if (value === undefined) {
      return undefined;
    } else {
      value = value + '';
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  constructor(private incamAddfareService: IncamAddfareService,
              private incamContractService: IncamContractService,
              private modal: NzModalService,
              private message: NzMessageService,
              private httpClient: HttpClient,
              private teacherService: TeacherService,
              ) {
                this.incamContract.pageNumber = 1;
                this.incamContract.size = 10;
                this.getIncamContract();
              }

  ngOnInit() {

  }


  getIncamContract() {
    this.incamContractService.getIncamContracts(this.incamContract).subscribe(data => {
      this.incamContract = data;
      this.incamContractLoading = false;
      this.selectedIncamContract = new IncamContract();
    });
  }

  getIncamAddfare() {
    this.incamAddfareService.getIncamAddfare(this.incamContract, this.selectedIncamContract.contract_seq).subscribe(data => {
      this.incamContract = data;
      this.incamContractLoading = false;
      this.selectedIncamContract = new IncamContract();
    });
  }

  selectIncamAddfare(param) {
    this.selectedIncamContract = param;
  }

  incamAddfareAdd() {
    this.popupIncamContract = new IncamContract();
    this.popupIncamContract.contract_seq = this.selectedIncamContract.addfare_seq;
    this.isIncamAddfareAdd = true;
  }

  incamContractOk(): void {
    this.incamContractService.addIncamContract(this.popupIncamContract).subscribe(data => {
      this.getIncamContract();
      this.selectedIncamContract = new IncamContract();
      this.isIncamAddfareAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
    this.selectedValue = null;
  }

  incamAddfareUpdate() {/*
    this.popupIncamContract = new IncamAddfare();
    this.popupIncamContract.addfare_seq = this.selectedIncamAddfare.addfare_seq;
    this.popupIncamContract.addfare_date = this.selectedIncamAddfare.addfare_date;
    this.popupIncamContract.teacher_seq = this.selectedIncamAddfare.teacher_seq;
    this.popupIncamContract.original_company = this.selectedIncamAddfare.original_company;
    this.popupIncamContract.class = this.selectedIncamAddfare.class;
    this.popupIncamContract.gubun = this.selectedIncamAddfare.gubun;
    this.popupIncamContract.price = this.selectedIncamAddfare.price;
    this.popupIncamContract.hour_price = this.selectedIncamAddfare.hour_price;
    this.popupIncamContract.hour = this.selectedIncamAddfare.hour;
    this.popupIncamContract.tax = this.selectedIncamAddfare.tax;
    this.popupIncamContract.income_type = this.selectedIncamAddfare.income_type;
    this.popupIncamContract.remit = this.selectedIncamAddfare.remit;
    this.isIncamAddfareUpdate = true;
    this.popupGubun = this.selectedIncamAddfare.gubun.toString();
    this.popupIncomeType = this.selectedIncamAddfare.income_type.toString();

    this.teacherService.getTeachers(this.teachers).subscribe(data => {
      data.data.forEach(item => {
        if(item.teacher_seq == this.selectedIncamAddfare.teacher_seq) {
          this.search(item.name);
        }
      });
    });
    */

  }

  incamAddfareUpdateOk(): void {
    /*
    this.popupIncamContract.gubun = Number(this.popupGubun);
    this.popupIncamContract.income_type = Number(this.popupIncomeType);
    console.log("teacher seq = ", this.popupIncamContract.teacher_seq);
    // this.popupIncamAddfare.addfare_date.setDate(this.popupIncamAddfare.addfare_date.getDate() + 1);
    this.incamAddfareService.updateIncamAddfare(this.popupIncamContract).subscribe(data => {
      this.getIncamContract();
      this.isIncamAddfareUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
    */
  }

  popupCancel(): void {
    this.isIncamAddfareAdd = false;
    this.isIncamAddfareUpdate = false;
  }

  incamAddfareDelete() {
    this.modal.confirm({
      nzTitle: '삭제하시겠습니까?',
      // nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.incamAddfareService.deleteIncamAddfare(this.selectedIncamAddfare.addfare_seq).subscribe(data => {
          this.getIncamContract();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }


  search(value: string): void {
    this.listOfOption = null;
    this.teacherService.getTeachers(this.teachers)
    .subscribe(data => {
      const listOfOption: Array<{ value: string; text: string }> = [];
      data.data.forEach(item => {
        if(item.name.indexOf(value) > -1) {
          if(value !== '') {
            listOfOption.push({
              value: item.teacher_seq,
              text: item.name
            });
          }
        }
      });
      this.listOfOption = listOfOption;
    });

  }

}
