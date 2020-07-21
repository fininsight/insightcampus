import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { IncamAddfare } from '../core/models/incam-addfare';
import { DataTable } from '../core/models/datatable';
import { Subscription } from 'rxjs/internal/Subscription';
import en from '@angular/common/locales/en';

@Component({
  selector: 'app-page-family-addfare',
  templateUrl: './page-family-addfare.component.html',
  styleUrls: ['./page-family-addfare.component.css']
})
export class PageFamilyAddfareComponent implements OnInit {

  gubun = [{'gubun_num':1, 'gubun_val': '강사'}, {'gubun_num':2, 'gubun_val': '멘토'}];
  income_type = [{'income_type_num':1, 'income_type_val': '사업소득'}, {'income_type_num':2, 'income_type_val': '기타소득'}];
  popupGubun = '';
  popupIncomeType = '';

  incamAddfares = new DataTable();

  selectedIncamAddfare: IncamAddfare = new IncamAddfare();
  popupIncamAddfare: IncamAddfare = new IncamAddfare();

  isIncamAddfareAdd = false;
  isIncamAddfareUpdate = false;

  incamAddfareLoading = true;

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
    this.incamAddfareService.getFamilyIncamAddfare(this.incamAddfares).subscribe(data => {
      this.incamAddfares = data;
      this.incamAddfareLoading = false;
      this.selectedIncamAddfare = new IncamAddfare();
    });
  }

  selectIncamAddfare(param) {
    this.selectedIncamAddfare = param;
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
  }

  popupCancel(): void {
    this.isIncamAddfareUpdate = false;
  }

  incamAddfarePdf() {
    this.message.create('sucess', '준비중입니다.');
  }

}
