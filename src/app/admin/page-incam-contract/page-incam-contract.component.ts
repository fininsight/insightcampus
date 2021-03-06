import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { IncamContractService } from '../core/services/incam-contract.service';
import { CodeService } from '../core/services/code.service';
import { DataTable } from '../core/models/datatable';
import { HttpClient } from '@angular/common/http';
import { TeacherService } from '../core/services/teacher.service';
import { IncamContract } from '../core/models/incam-contract';

@Component({
  selector: 'app-page-incam-contract',
  templateUrl: './page-incam-contract.component.html',
  styleUrls: ['./page-incam-contract.component.css']
})
export class PageIncamContractComponent implements OnInit {

  gubun = [{gubun_num: 1, gubun_val: '강사'}, {gubun_num: 2, gubun_val: '멘토'}];
  income_type = [{income_type_num: 1, income_type_val: '사업소득'}, {income_type_num: 2, income_type_val: '기타소득'}];
  popupGubun = '';
  popupIncomeType = '';

  incamContract = new DataTable();

  selectedIncamContract: IncamContract = new IncamContract();
  popupIncamContract: IncamContract = new IncamContract();

  isIncamContractAdd = false;
  isIncamContractUpdate = false;

  incamContractLoading = true;
  allCheck = false;
  checks = [];

  selectedValue = null;
  listOfTeacher: Array<{ value: number; text: string }> = [];
  listOfCooperative: Array<{ value: string; text: string }> = [];

  confirmModal?: NzModalRef;

  filter = {
    original_company: '',
    class: '',
    name: '',
    date: [
      this.addMonths(new Date(), -1),
      new Date()
    ]
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
              private httpClient: HttpClient,
              private teacherService: TeacherService,
              ) {

    this.searchTeacher('ALL');
    this.incamContract.pageNumber = 1;
    this.incamContract.size = 30;
    this.getIncamContract();

  }

  ngOnInit() {
    this.codeService.getCodes('cooperative').subscribe(data => {
      data.forEach(item => {
        this.listOfCooperative.push({
          value: item.code_id,
          text: item.code_nm
        });
      });
    });
  }

  addMonths(date, months) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  selectTeacher(value: string): void {
    this.searchTeacher(value);
  }

  searchTeacher(value: string) {
    this.teacherService.searchTeacher(value).subscribe(data => {
      this.listOfTeacher = [];
      data.forEach(item => {
        this.listOfTeacher.push({
          value: item.teacher_seq,
          text: item.name
        });
      });
    });
  }

  allCheckChange() {
    this.incamContract.data = this.incamContract.data.map(v => {
      v.check = this.allCheck;
      return v;
    });
  }

  getIncamContract() {
    this.incamContractService.getIncamContracts(this.incamContract, this.filter).subscribe(data => {
      this.incamContract = data;
      this.incamContractLoading = false;
      this.selectedIncamContract = new IncamContract();
    });
  }

  getIncamSele() {
    this.incamAddfareService.getIncamAddfare(this.incamContract, this.selectedIncamContract.contract_seq).subscribe(data => {
      this.incamContract = data;
      this.incamContractLoading = false;
      this.selectedIncamContract = new IncamContract();
    });
  }

  incamContractExcel() {
    this.confirmModal = this.modal.confirm({
      nzTitle: '정산리스트 엑셀 다운로드',
      nzContent: '정산리스트를 엑셀로 다운로드하시겠습니까?',
      nzOnOk: () => {
        this.incamContractService.getIncamContractsExcel(this.filter);
      },
      nzOnCancel: () => {
        this.confirmModal.destroy();
      }
    });
  }

  selectIncamContract(param) {
    this.selectedIncamContract = param;
  }

  incamContractAdd() {
    this.popupIncamContract = new IncamContract();
    this.isIncamContractAdd = true;
  }

  incamContractAddOk(): void {
    this.incamContractService.addIncamContract(this.popupIncamContract).subscribe(data => {
      this.getIncamContract();
      this.selectedIncamContract = new IncamContract();
      this.isIncamContractAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
    this.selectedValue = null;
  }

  incamContractUpdate() {
    this.popupIncamContract = new IncamContract();
    this.popupIncamContract = JSON.parse(JSON.stringify(this.selectedIncamContract));
    this.isIncamContractUpdate = true;
  }

  incamContractUpdateOk(): void {
     this.incamContractService.updateIncamContract(this.popupIncamContract).subscribe(data => {
      this.getIncamContract();
      this.isIncamContractUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
  }

  popupCancel(): void {
    this.isIncamContractAdd = false;
    this.isIncamContractUpdate = false;
  }

  incamContractDelete() {
    this.modal.confirm({
      nzTitle: '삭제하시겠습니까?',
      // nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.incamContractService.deleteIncamContract(this.selectedIncamContract.contract_seq).subscribe(data => {
          this.getIncamContract();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }
}
