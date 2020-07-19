import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { IncamAddfare } from '../core/models/incam-addfare';
import { DataTable } from '../core/models/datatable';
import { Subscription } from 'rxjs/internal/Subscription';
import en from '@angular/common/locales/en';

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

}
