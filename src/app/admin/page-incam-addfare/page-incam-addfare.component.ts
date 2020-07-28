import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { IncamAddfare } from '../core/models/incam-addfare';
import { DataTable } from '../core/models/datatable';
import { Subscription } from 'rxjs/internal/Subscription';
import en from '@angular/common/locales/en';
import { HttpClient } from '@angular/common/http';
import { TeacherService } from '../core/services/teacher.service';

@Component({
  selector: 'app-page-incam-addfare',
  templateUrl: './page-incam-addfare.component.html',
  styleUrls: ['./page-incam-addfare.component.css']
})
export class PageIncamAddfareComponent implements OnInit {
  gubun = [{'gubun_num':1, 'gubun_val': '강사'}, {'gubun_num':2, 'gubun_val': '멘토'}];
  income_type = [{'income_type_num':1, 'income_type_val': '사업소득'}, {'income_type_num':2, 'income_type_val': '기타소득'}];
  popupGubun = "";
  popupIncomeType = "";

  incamAddfares = new DataTable();

  selectedIncamAddfare: IncamAddfare = new IncamAddfare();
  popupIncamAddfare: IncamAddfare = new IncamAddfare();

  isIncamAddfareAdd = false;
  isIncamAddfareUpdate = false;

  incamAddfareLoading = true;

  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  teachers = new DataTable();

  private subscription: Subscription;

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
              private modal: NzModalService,
              private message: NzMessageService,
              private httpClient: HttpClient,
              private teacherService: TeacherService,
              ) {
                this.incamAddfares.pageNumber = 1;
                this.incamAddfares.size = 10;
                this.getIncamAddfares();
              }

  ngOnInit() {

  }

  calculation(incamAddfare: IncamAddfare) {
    return {
      all: incamAddfare.price * incamAddfare.hour,
      all_tax: incamAddfare.price * incamAddfare.hour * incamAddfare.tax,
      all_deposit: incamAddfare.price * incamAddfare.hour - (incamAddfare.price * incamAddfare.hour * incamAddfare.tax),
      employee_all: incamAddfare.hour_price * incamAddfare.hour,
      employee_tax: incamAddfare.hour_price * incamAddfare.hour * incamAddfare.tax,
      employee_deposit: (incamAddfare.hour_price * incamAddfare.hour) - (incamAddfare.hour_price * incamAddfare.hour * incamAddfare.tax),
      remittance: (incamAddfare.price * incamAddfare.hour - (incamAddfare.price * incamAddfare.hour * incamAddfare.tax)) -
                  ((incamAddfare.hour_price * incamAddfare.hour) - (incamAddfare.hour_price * incamAddfare.hour * incamAddfare.tax))
    };
  }

  getIncamAddfares() {
    this.incamAddfareService.getIncamAddfares(this.incamAddfares).subscribe(data => {
      this.incamAddfares = data;
      this.incamAddfareLoading = false;
      this.selectedIncamAddfare = new IncamAddfare();
    });
  }

  getIncamAddfare() {
    this.incamAddfareService.getIncamAddfare(this.incamAddfares, this.selectedIncamAddfare.addfare_seq).subscribe(data => {
      this.incamAddfares = data;
      this.incamAddfareLoading = false;
      this.selectedIncamAddfare = new IncamAddfare();
    });
  }

  selectIncamAddfare(param) {
    this.selectedIncamAddfare = param;
  }

  incamAddfareAdd() {
    this.popupIncamAddfare = new IncamAddfare();
    this.popupIncamAddfare.addfare_seq = this.selectedIncamAddfare.addfare_seq;
    this.isIncamAddfareAdd = true;
  }

  incamAddfareAddOk(): void {
    this.incamAddfareService.addIncamAddfare(this.popupIncamAddfare).subscribe(data => {
      this.getIncamAddfares();
      this.selectedIncamAddfare = new IncamAddfare();
      this.isIncamAddfareAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
    this.selectedValue = null; //initialize value
  }

  incamAddfareUpdate() {
    this.popupIncamAddfare = new IncamAddfare();
    this.popupIncamAddfare.addfare_seq = this.selectedIncamAddfare.addfare_seq;
    this.popupIncamAddfare.addfare_date = this.selectedIncamAddfare.addfare_date;
    this.popupIncamAddfare.teacher_seq = this.selectedIncamAddfare.teacher_seq;
    this.popupIncamAddfare.original_company = this.selectedIncamAddfare.original_company;
    this.popupIncamAddfare.class = this.selectedIncamAddfare.class;
    this.popupIncamAddfare.gubun = this.selectedIncamAddfare.gubun;
    this.popupIncamAddfare.price = this.selectedIncamAddfare.price;
    this.popupIncamAddfare.hour_price = this.selectedIncamAddfare.hour_price;
    this.popupIncamAddfare.hour = this.selectedIncamAddfare.hour;
    this.popupIncamAddfare.tax = this.selectedIncamAddfare.tax;
    this.popupIncamAddfare.income_type = this.selectedIncamAddfare.income_type;
    this.popupIncamAddfare.remit = this.selectedIncamAddfare.remit;
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

  }

  incamAddfareUpdateOk(): void {
    this.popupIncamAddfare.gubun = Number(this.popupGubun);
    this.popupIncamAddfare.income_type = Number(this.popupIncomeType);
    console.log("teacher seq = ", this.popupIncamAddfare.teacher_seq);
    // this.popupIncamAddfare.addfare_date.setDate(this.popupIncamAddfare.addfare_date.getDate() + 1);
    this.incamAddfareService.updateIncamAddfare(this.popupIncamAddfare).subscribe(data => {
      this.getIncamAddfares();
      this.isIncamAddfareUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
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
          this.getIncamAddfares();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }

  incamAddfarePdf() {
    this.message.create('sucess', '준비중입니다.');
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
