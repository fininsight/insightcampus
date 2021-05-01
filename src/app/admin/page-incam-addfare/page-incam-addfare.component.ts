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

@Component({
  selector: 'app-page-incam-addfare',
  templateUrl: './page-incam-addfare.component.html',
  styleUrls: ['./page-incam-addfare.component.css']
})
export class PageIncamAddfareComponent implements OnInit {

  baseUrl = environment.apiUrl;

  incamAddfares = new DataTable();

  selectedIncamAddfare: IncamAddfare = new IncamAddfare();
  popupIncamAddfare: IncamAddfare = new IncamAddfare();

  isIncamAddfareAdd = false;
  isIncamAddfareUpdate = false;
  isSendMail = false;
  isDepositCheck = false;

  incamAddfareLoading = true;
  allCheck = false;
  checks: any;

  mailSendLoading = false;
  mailSendLoadingText = '메일전송중';

  selectedValue = null;
  listOfTeacher: Array<{ value: number; text: string }> = [];
  listOfContract: Array<{ value: number; text: string; hour_price: number, hour_incen: number, contract_price: number }> = [];
  listOfIncom: Array<{ value: string; text: string, rate: number }> = [];
  listOfDeposit: Array< { value: number; text: string;}> = [{value: 2, text: "전체"},{value: 1, text: "완료"},{value: 0, text: "미완료"}];

  teachers = new DataTable();
  confirmModal?: NzModalRef;

  start_date = new Date();

  filter = {
    original_company: '',
    class: '',
    name: '',
    date: [
      this.addMonths(new Date(), -1),
      new Date()
    ],
    deposit: 2
  };

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
    this.searchContract('ALL');
    this.codeService.getCodes('incom').subscribe(data => {
      data.forEach(item => {
        this.listOfIncom.push({
          value: item.code_id,
          text: item.code_nm,
          rate: parseFloat(item.value1)
        });
      });
    });
  }

  addMonths(date, months) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  changeIncome(event) {
    this.popupIncamAddfare.income = this.listOfIncom.filter(f => f.value === event)[0].rate;
    this.setCalculation(event);
  }

  setCalculation(value: string) {
    const contractIndex = this.listOfContract.findIndex(item => item.value === this.popupIncamAddfare.contract_seq);

    if (contractIndex !== -1 && this.popupIncamAddfare.hour > 0) {
      this.calculation.all = this.popupIncamAddfare.hour_price * this.popupIncamAddfare.hour;
      this.calculation.all_tax =  Math.floor(this.calculation.all * this.popupIncamAddfare.income / 10) * 10;
      this.calculation.all_deposit = this.calculation.all - this.calculation.all_tax;
      this.calculation.employee_all = this.popupIncamAddfare.contract_price * this.popupIncamAddfare.hour;
      this.calculation.employee_tax = Math.floor(this.calculation.employee_all * this.popupIncamAddfare.income / 10) * 10;
      this.calculation.employee_deposit = this.calculation.employee_all - this.calculation.employee_tax;
      this.calculation.remittance = this.calculation.all_deposit - this.calculation.employee_deposit;
    } else {
      this.calculation.all = 0;
      this.calculation.all_tax = 0;
      this.calculation.all_deposit = 0;
      this.calculation.employee_all = 0;
      this.calculation.employee_tax = 0;
      this.calculation.employee_deposit = 0;
      this.calculation.remittance = 0;
    }
  }

  calculate(data) {
      const contractIndex = this.listOfContract.findIndex(item => item.value === data.contract_seq);

      const all = this.listOfContract[contractIndex].hour_price * data.hour;
      const all_tax =  Math.floor(all * data.income / 10) * 10;
      const all_deposit = all - all_tax;
      const employee_all = this.listOfContract[contractIndex].contract_price * data.hour;
      const employee_tax = Math.floor(employee_all * data.income / 10) * 10;
      const employee_deposit = employee_all - employee_tax;
      const remittance = all_deposit - employee_deposit;

      return [employee_deposit, remittance];
  }

  sendMail() {
    this.checks = this.incamAddfares.data.filter(v => (v.check));
    this.isSendMail = true;
  }

  async isSendMailOk() {
    this.mailSendLoading = true;
    const checksCopy = JSON.parse(JSON.stringify(this.checks));
    const all = checksCopy.length;
    this.mailSendLoadingText = `메일전송중 (총 : ${all} / 전송완료 : 0)`;

    while (checksCopy.length > 0) {

      const basket = [];
      basket.push(checksCopy.pop());
      await this.incamAddfareService.sendAddfare(basket);
      this.mailSendLoadingText = `메일전송중 (총 : ${all} / 전송완료 : ${all - checksCopy.length})`;

      // const basket = [];
      // for (let i = 0; i < 5 && checksCopy.length > 0; i++) {
      //   basket.push(checksCopy.pop());
      //   ing++;
      // }
      // this.mailSendLoadingText = `메일전송중 (총 : ${all} / 전송중 : ${ing})`;
      // await this.incamAddfareService.sendAddfare(basket);
    }

    this.message.create('success', '전송이 완료되었습니다.');
    this.mailSendLoading = false;
    this.isSendMail = false;
  }

  allCheckChange() {
    this.incamAddfares.data = this.incamAddfares.data.map(v => {
      v.check = this.allCheck;
      return v;
    });
  }

  getIncamAddfares() {
    this.incamAddfareService.getIncamAddfares(this.incamAddfares, this.filter).subscribe(data => {

      data.data = data.data.map(v => {
        v.check = false;
        return v;
      });

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

  incamAddfareExcel() {
    this.confirmModal = this.modal.confirm({
      nzTitle: '정산리스트 엑셀 다운로드',
      nzContent: '정산리스트를 엑셀로 다운로드하시겠습니까?',
      nzOnOk: () => {
        this.incamAddfareService.getIncamAddfaresExcel(this.filter);
      },
      nzOnCancel: () => {
        this.confirmModal.destroy();
      }
    });
  }

  selectIncamAddfare(param) {
    this.selectedIncamAddfare = param;
  }

  incamAddfareAdd() {
    this.popupIncamAddfare = new IncamAddfare();
    this.popupIncamAddfare.hour = 0;
    this.isIncamAddfareAdd = true;
    this.setCalculation(null);
  }

  incamAddfareAddOk(): void {
    this.incamAddfareService.addIncamAddfare(this.popupIncamAddfare).subscribe(data => {
      this.getIncamAddfares();
      this.selectedIncamAddfare = new IncamAddfare();
      this.isIncamAddfareAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
    this.selectedValue = null;
  }

  incamAddfareUpdate() {
    this.popupIncamAddfare = new IncamAddfare();
    this.popupIncamAddfare = JSON.parse(JSON.stringify(this.selectedIncamAddfare));
    this.isIncamAddfareUpdate = true;
    this.setCalculation(null);
  }

  incamAddfareUpdateOk(): void {
    this.incamAddfareService.updateIncamAddfare(this.popupIncamAddfare).subscribe(data => {
      this.getIncamAddfares();
      this.isIncamAddfareUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
  }

  popupCancel(): void {
    this.isIncamAddfareAdd = false;
    this.isIncamAddfareUpdate = false;
    this.isSendMail = false;
    this.isDepositCheck = false;
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

  incamAddfareDeposit() {
    this.checks = this.incamAddfares.data.filter(v => (v.check));
    this.isDepositCheck = true;
  }

  isDepositCheckOK() {

    this.confirmModal = this.modal.confirm({
      nzTitle: '입금완료 확인',
      nzContent: '입금완료 처리하시겠습니까? ',
      nzOnOk: () => {

        let checksCopy = JSON.parse(JSON.stringify(this.checks));

        // 입금으로 변경
        checksCopy = checksCopy.map(v => {
          v.check_yn = 1;
          return v;
        });

        this.incamAddfareService.updateDeposit(checksCopy).subscribe(data => {
          this.getIncamAddfares();
        });

        this.isDepositCheck = false;
      },
      nzOnCancel: () => {
        this.confirmModal.destroy();
        this.isDepositCheck = false;
      }
    });
  }

  selectContract(value: string): void {
    this.searchContract(value);
  }

  searchContract(value: string) {
    this.incamContractService.searchIncamContract(value).subscribe(data => {
      this.listOfContract = [];
      data.forEach(item => {
        this.listOfContract.push({
          value: item.contract_seq,
          text: item.name + ' ' + item.original_company_nm + ' ' + item.class,
          hour_price: item.hour_price,
          hour_incen: item.hour_incen,
          contract_price: item.contract_price
        });
      });
    });
  }

}
