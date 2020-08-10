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

  selectedValue = null;
  teachers = new DataTable();
  confirmModal?: NzModalRef;

  listOfCooperative: Array<{ value: string; text: string }> = [];

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
                this.incamContract.pageNumber = 1;
                this.incamContract.size = 10;
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

  getIncamContract() {
    this.incamContractService.getIncamContracts(this.incamContract).subscribe(data => {
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

  selectIncamContract(param) {
    this.selectedIncamContract = param;
  }

  incamContractAdd() {
    this.popupIncamContract = new IncamContract();
    this.isIncamContractAdd = true;
  }

  incamContractOk(): void {
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
