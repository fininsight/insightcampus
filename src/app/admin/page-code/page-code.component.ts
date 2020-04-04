import { Component, OnInit } from '@angular/core';
import { CodegroupService } from '../core/services/codegroup.service';
import { CodeService } from '../core/services/code.service';
import { DataTable } from '../core/models/datatable';
import { Code } from '../core/models/Code';
import { Codegroup } from '../core/models/codegroup';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-page-code',
  templateUrl: './page-code.component.html',
  styleUrls: ['./page-code.component.css']
})
export class PageCodeComponent implements OnInit {

  codes = new DataTable();
  codegroups = new DataTable();

  selectedCodegroup: Codegroup = new Codegroup();
  selectedCode: Code = new Code();

  popupCodegroup: Codegroup = new Codegroup();
  popupCode: Code = new Code();

  isGroupAdd = false;
  isGroupUpdate = false;
  isCodeAdd = false;
  isCodeUpdate = false;

  codegroupLoading = true;
  codeLoading = false;

  constructor(private codegroupService: CodegroupService,
              private codeService: CodeService,
              private message: NzMessageService,
              private modal: NzModalService) {

    this.codes.pageNumber = 1;
    this.codes.size = 20;
    this.codegroups.pageNumber = 1;
    this.codegroups.size = 20;

    this.getCodegroup();
  }

  ngOnInit(): void {
  }

  getCodegroup() {
    this.codegroupService.getCodegroups(this.codegroups).subscribe(data => {
      this.codegroups = data;
      this.codegroupLoading = false;
      this.selectedCodegroup = new Codegroup();
      this.codes = new DataTable();
    });
  }

  getCode() {
    this.codeService.getCode(this.codes, this.selectedCodegroup.codegroup_id).subscribe(data => {
      this.codes = data;
      this.codeLoading = false;
      this.selectedCode = new Code();
    });
  }

  selectCodegroup(param) {
   this.selectedCodegroup = param;
   this.codeLoading = true;
   this.getCode();
  }

  selectCode(param) {
    this.selectedCode = param;
  }

  groupAdd() {
    this.popupCodegroup = new Codegroup();
    this.isGroupAdd = true;
  }

  groupAddOk(): void {
    this.codegroupService.addCodegroup(this.popupCodegroup).subscribe(data => {
      this.getCodegroup();
      this.isGroupAdd = false;
      this.message.create('success', '코드그룹등록이 완료되었습니다.');
    });
  }

  groupUpdate() {
    this.popupCodegroup = new Codegroup();
    this.popupCodegroup.codegroup_id = this.selectedCodegroup.codegroup_id;
    this.popupCodegroup.codegroup_nm = this.selectedCodegroup.codegroup_nm;
    this.popupCodegroup.description = this.selectedCodegroup.description;
    this.isGroupUpdate = true;
  }

  groupUpdateOk(): void {
    this.codegroupService.updateCodegroup(this.popupCodegroup).subscribe(data => {
      this.getCodegroup();
      this.isGroupUpdate = false;
      this.message.create('success', '코드그룹수정이 완료되었습니다.');
    });
  }

  groupDelete() {
    this.modal.confirm({
      nzTitle: '코드그룹을 삭제하시겠습니까?',
      // nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.codegroupService.deleteCodegroup(this.selectedCodegroup.codegroup_id).subscribe(data => {
          this.getCodegroup();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }

  codeAdd() {
    this.popupCode = new Code();
    this.popupCode.codegroup_id = this.selectedCodegroup.codegroup_id;
    this.isCodeAdd = true;
  }

  codeAddOk() {
    this.codeService.addCode(this.popupCode).subscribe(data => {
      this.getCode();
      this.selectedCode = new Code();
      this.isCodeAdd = false;
      this.message.create('success', '코드등록이 완료되었습니다.');
    });
  }

  popupCancel(): void {
    this.isGroupAdd = false;
    this.isGroupUpdate = false;
    this.isCodeAdd = false;
    this.isCodeUpdate = false;
  }

  codeUpdate() {
    this.popupCode = new Code();
    this.popupCode.codegroup_id = this.selectedCode.codegroup_id;
    this.popupCode.code_id = this.selectedCode.code_id;
    this.popupCode.code_nm = this.selectedCode.code_nm;
    this.popupCode.value1 = this.selectedCode.value1;
    this.popupCode.value2 = this.selectedCode.value2;
    this.popupCode.value3 = this.selectedCode.value3;
    this.popupCode.value4 = this.selectedCode.value4;
    this.popupCode.value5 = this.selectedCode.value5;
    this.popupCode.order_num = this.selectedCode.order_num;
    this.isCodeUpdate = true;
  }

  codeUpdateOk() {
    this.codeService.updateCode(this.popupCode).subscribe(data => {
      this.getCode();
      this.isCodeUpdate = false;
      this.message.create('success', '코드수정이 완료되었습니다.');
    });
  }

  codeDelete() {
    this.modal.confirm({
      nzTitle: '코드를 삭제하시겠습니까?',
      // nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.codeService.deleteCode(this.selectedCode.codegroup_id, this.selectedCode.code_id).subscribe(data => {
          this.getCode();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }


}
