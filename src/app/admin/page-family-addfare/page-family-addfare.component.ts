import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { IncamAddfare } from '../core/models/incam-addfare';
import { IncamContractService } from '../core/services/incam-contract.service';
import { CodeService } from '../core/services/code.service';
import { environment } from 'src/environments/environment';
import { DataTable } from '../core/models/datatable';
import { TeacherService } from '../core/services/teacher.service';
import en from '@angular/common/locales/en';

@Component({
  selector: 'app-page-family-addfare',
  templateUrl: './page-family-addfare.component.html',
  styleUrls: ['./page-family-addfare.component.css']
})
export class PageFamilyAddfareComponent implements OnInit {

  baseUrl = environment.apiUrl;

  incamAddfares = new DataTable();

  selectedIncamAddfare: IncamAddfare = new IncamAddfare();
  popupIncamAddfare: IncamAddfare = new IncamAddfare();

  isIncamAddfareAdd = false;
  isIncamAddfareUpdate = false;
  isSendMail = false;

  incamAddfareLoading = true;
  allCheck = false;
  checks = [];

  selectedValue = null;
  listOfTeacher: Array<{ value: number; text: string }> = [];
  listOfContract: Array<{ value: number; text: string; hour_price: number, hour_incen: number, contract_price: number }> = [];
  listOfIncom: Array<{ value: string; text: string, rate: number }> = [];

  teachers = new DataTable();
  confirmModal?: NzModalRef;

  calculation = {
      all: 0,
      all_tax: 0,
      all_deposit: 0,
      employee_all: 0,
      employee_tax: 0,
      employee_deposit: 0,
      remittance: 0
  };

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
              private codeService: CodeService,
              private modal: NzModalService,
              private message: NzMessageService,
              private teacherService: TeacherService
              ) {
                this.incamAddfares.pageNumber = 1;
                this.incamAddfares.size = 30;
                this.getIncamAddfares();
              }

  ngOnInit() {
  }

  calculate(data) {
    const all = data.hour_price * data.hour;
    const all_tax =  Math.floor(all * data.income / 10) * 10;
    const all_deposit = all - all_tax;
    const employee_all = data.contract_price * data.hour;
    const employee_tax = Math.floor(employee_all * data.income / 10) * 10;
    const employee_deposit = employee_all - employee_tax;
    const remittance = all_deposit - employee_deposit;

    return [employee_deposit, remittance];
  }

  getIncamAddfares() {
    this.incamAddfareService.getFamilyIncamAddfares(this.incamAddfares).subscribe(data => {
      this.incamAddfares = data;
      this.incamAddfareLoading = false;
      this.selectedIncamAddfare = new IncamAddfare();

    });
  }

  selectIncamAddfare(param) {
    this.selectedIncamAddfare = param;
  }

  incamAddfarePdf() {
    const pdfLink = this.baseUrl + 'pdf/addfare/';
    this.confirmModal = this.modal.confirm({
      nzTitle: '정산내용 PDF 다운로드',
      nzContent: '선택하신 내용을 PDF로 다운로드하시겠습니까?',
      nzOnOk: () => {
        location.assign(pdfLink + this.selectedIncamAddfare.addfare_seq);
      },
      nzOnCancel: () => {
        this.confirmModal.destroy();
      }
    });
  }

}
