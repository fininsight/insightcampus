import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { IncamAddfare } from '../core/models/incam-addfare';
import { DataTable } from '../core/models/datatable';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-page-incam-addfare',
  templateUrl: './page-incam-addfare.component.html',
  styleUrls: ['./page-incam-addfare.component.css']
})
export class PageIncamAddfareComponent implements OnInit {


  incamAddfares = new DataTable();

  selectedIncamAddfare: IncamAddfare = new IncamAddfare();
  popupIncamAddfare: IncamAddfare = new IncamAddfare();

  isIncamAddfareAdd = false;
  isIncamAddfareUpdate = false;

  incamAddfareLoading = true;
  
  private subscription: Subscription;

  constructor(private incamAddfareService: IncamAddfareService,
              private modal: NzModalService,
              private message: NzMessageService,
              ) { 
                this.incamAddfares.pageNumber = 1;
                this.incamAddfares.size = 10;
                this.getIncamAddfares();
              }

  ngOnInit(){
    
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

  incamAddfareAddOk() : void {
    // this.popupIncamAddfare.price = Number((<HTMLInputElement>document.getElementById("price")).value);
    this.incamAddfareService.addIncamAddfare(this.popupIncamAddfare).subscribe(data => {
      this.getIncamAddfares();
      this.selectedIncamAddfare = new IncamAddfare();
      this.isIncamAddfareAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
  }

  incamAddfareUpdate() {
    this.popupIncamAddfare = new IncamAddfare();
    this.popupIncamAddfare.addfare_seq = this.selectedIncamAddfare.addfare_seq;
    this.popupIncamAddfare.addfare_date = this.selectedIncamAddfare.addfare_date;
    this.popupIncamAddfare.original_company = this.selectedIncamAddfare.original_company;
    this.popupIncamAddfare.class = this.selectedIncamAddfare.class;
    this.popupIncamAddfare.gubun = this.selectedIncamAddfare.gubun;
    this.popupIncamAddfare.name = this.selectedIncamAddfare.name;
    this.popupIncamAddfare.price = this.selectedIncamAddfare.price;
    this.popupIncamAddfare.hour = this.selectedIncamAddfare.hour;
    this.popupIncamAddfare.tax = this.selectedIncamAddfare.tax;
    this.popupIncamAddfare.income_type = this.selectedIncamAddfare.income_type;
    this.popupIncamAddfare.remit = this.selectedIncamAddfare.remit;
    this.isIncamAddfareUpdate = true;
  }

  incamAddfareUpdateOk() : void {
    this.incamAddfareService.updateIncamAddfare(this.popupIncamAddfare).subscribe(data => {
      this.getIncamAddfares();
      this.isIncamAddfareUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
  }

  popupCancel(): void{
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

  // value = '';
  // title = 'Input a number';

  // @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  // onChange(value: string): void {
  //   this.updateValue(value);
  // }

  // // '.' at the end or only '-' in the input box.
  // onBlur(): void {
  //   if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
  //     this.updateValue(this.value.slice(0, -1));
  //   }
  // }

  // updateValue(value: string): void {
  //   const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  //   if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
  //     this.value = value;
  //   }
  //   this.inputElement!.nativeElement.value = this.value;
  //   this.updateTitle();
  // }

  // updateTitle(): void {
  //   this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
  // }

  // formatNumber(value: string): string {
  //   const stringValue = `${value}`;
  //   const list = stringValue.split('.');
  //   const prefix = list[0].charAt(0) === '-' ? '-' : '';
  //   let num = prefix ? list[0].slice(1) : list[0];
  //   let result = '';
  //   while (num.length > 3) {
  //     result = `,${num.slice(-3)}${result}`;
  //     num = num.slice(0, num.length - 3);
  //   }
  //   if (num) {
  //     result = num + result;
  //   }
  //   return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  // }
  



}