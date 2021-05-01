import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../core/services/curriculum.service';
import { ClassService } from '../core/services/class.service';
import { CurriculumgroupService } from '../core/services/curriculumgroup.service';
import { DataTable } from '../core/models/datatable';
import { Curriculum } from '../core/models/curriculum';
import { Curriculumgroup } from '../core/models/curriculumgroup';
import { Class } from '../core/models/class';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Code } from '../core/models/code';
import { CodeService } from '../core/services/code.service';


@Component({
  selector: 'app-page-curriculum',
  templateUrl: './page-curriculum.component.html',
  styleUrls: ['./page-curriculum.component.css']
})
export class PageCurriculumComponent implements OnInit {
  curriculums = new DataTable();
  classes = new DataTable();
  curriculumgroups = new DataTable();

  selectedCurriculum: Curriculum = new Curriculum();
  selectedClass: Class = new Class();
  selectedCurriculumgroup : Curriculumgroup = new Curriculumgroup();

  popupCurriculum: Curriculum = new Curriculum();
  popupCurriculumgroup : Curriculumgroup = new Curriculumgroup();

  curriculumType: Array<Code> = [];

  isCurriculumAdd = false;
  isCurriculumUpdate = false;

  isCurriculumgroupAdd = false;
  isCurriculumgroupUpdate = false;

  curriculumLoading = false;
  classLoading = false;
  curriculumgroupLoading = false;
  
  constructor(
    private curriculumService: CurriculumService,
    private classService: ClassService,
    private curriculumgroupService: CurriculumgroupService,
    private codeService: CodeService,
    private message: NzMessageService,
    private modal: NzModalService) {

      this.curriculums.pageNumber = 1;
      this.curriculums.size = 20;
      this.classes.pageNumber = 1;
      this.classes.size = 20;
      this.curriculumgroups.pageNumber = 1;
      this.curriculumgroups.size = 20;

      this.getClass();
      this.getCodes();
    }

  ngOnInit(): void {
  }

  getCodes() {
    this.codeService.getCodes('curriculum_type').subscribe(data => {
      this.curriculumType = data;
    })
  }

  getClass() {
    this.classService.getClasses(this.classes).subscribe(data => {
      this.classes = data;
      this.classLoading = false;
      this.selectedClass = new Class();
      this.curriculumgroups = new DataTable();
    });
  }

  selectClass(param) {
    this.selectedClass = param;
    this.classLoading = true;
    this.getCurriculumgroup();
  }

  getCurriculumgroup() {
    this.curriculumgroupService.getCurriculumgroup(this.curriculumgroups, this.selectedClass.class_seq).subscribe(data => {
      this.curriculumgroups = data;
      this.curriculumgroupLoading = false;
      this.classLoading = false;
      this.selectedCurriculumgroup = new Curriculumgroup();
      this.curriculums = new DataTable();
    })
  }

  selectCurriculumgroup(param) {
    this.selectedCurriculumgroup = param;
    this.curriculumLoading = true;
    this.getCurriculum();
  }

  curriculumgroupAdd() {
    this.popupCurriculumgroup = new Curriculumgroup();
    this.popupCurriculumgroup.curriculumgroup_seq = this.selectedCurriculumgroup.curriculumgroup_seq;
    this.isCurriculumgroupAdd = true;
  }

  curriculumgroupAddOk(): void {
    this.popupCurriculumgroup.class_seq = this.selectedClass.class_seq;
    this.curriculumgroupService.addCurriculumgroup(this.popupCurriculumgroup).subscribe(data => {
      this.getCurriculumgroup();
      this.selectedCurriculumgroup = new Curriculumgroup();
      this.isCurriculumgroupAdd = false;
      this.message.create('success', '커리큘럼그룹등록이 완료되었습니다.');
    });
  }
  
  curriculumgroupUpdate() {
    this.popupCurriculumgroup = new Curriculumgroup();
    this.popupCurriculumgroup.curriculumgroup_seq = this.selectedCurriculumgroup.curriculumgroup_seq;
    this.popupCurriculumgroup.curriculumgroup_nm = this.selectedCurriculumgroup.curriculumgroup_nm;
    this.popupCurriculumgroup.class_seq = this.selectedCurriculumgroup.class_seq;
    this.isCurriculumgroupUpdate = true;
  }

  curriculumgroupUpdateOk(): void {
    this.curriculumgroupService.updateCurriculumgroup(this.popupCurriculumgroup).subscribe(data => {
      this.getCurriculumgroup();
      this.isCurriculumgroupUpdate = false;
      this.message.create('sucess', '커리큘럼그룹수정이 완료되었습니다.');
    });
  }

  curriculumgroupDelete() {
    this.modal.confirm({
      nzTitle: '커리큘럼그룹을 삭제하시겠습니까?',
      // nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.curriculumgroupService.deleteCurriculumgroup(this.selectedCurriculumgroup.curriculumgroup_seq).subscribe(data => {
          this.getCurriculumgroup();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }

  getCurriculum() {
    this.curriculumService.getCurriculum(this.curriculums, this.selectedCurriculumgroup.curriculumgroup_seq).subscribe(data => {
      this.curriculums = data;
      this.curriculumLoading = false;
      this.classLoading = false;
      this.curriculumgroupLoading = false;
      this.selectedCurriculum = new Curriculum();
    });
  }

  selectCurriculum(param) {
    this.selectedCurriculum = param;
  }

  curriculumAdd() {
    this.popupCurriculum = new Curriculum();
    this.popupCurriculum.curriculum_seq = this.selectedCurriculum.curriculum_seq;
    this.isCurriculumAdd = true;
  }

  curriculumAddOk(): void {
    this.popupCurriculum.curriculumgroup_seq = this.selectedCurriculumgroup.curriculumgroup_seq;
    this.curriculumService.addCurriculum(this.popupCurriculum).subscribe(data => {
      this.getCurriculum();
      this.selectedCurriculum = new Curriculum();
      this.isCurriculumAdd = false;
      this.message.create('success', '커리큘럼등록이 완료되었습니다.');
    });
  }

  curriculumUpdate() {
    this.popupCurriculum = new Curriculum();
    this.popupCurriculum.curriculum_seq = this.selectedCurriculum.curriculum_seq;
    this.popupCurriculum.curriculum_nm = this.selectedCurriculum.curriculum_nm;
    this.popupCurriculum.curriculumgroup_seq = this.selectedCurriculum.curriculumgroup_seq;
    this.popupCurriculum.order = this.selectedCurriculum.order;
    this.popupCurriculum.type = this.selectedCurriculum.type;
    this.popupCurriculum.option = this.selectedCurriculum.option;
    this.isCurriculumUpdate = true;
  }

  curriculumUpdateOk(): void {
    this.curriculumService.updateCurriculum(this.popupCurriculum).subscribe(data => {
      this.getCurriculum();
      this.isCurriculumUpdate = false;
      this.message.create('sucess', '커리큘럼수정이 완료되었습니다.');
    });
  }

  curriculumDelete() {
    this.modal.confirm({
      nzTitle: '커리큘럼을 삭제하시겠습니까?',
      // nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.curriculumService.deleteCurriculum(this.selectedCurriculum.curriculum_seq).subscribe(data => {
          this.getCurriculum();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }

  popupCancel(): void{
    this.isCurriculumAdd = false;
    this.isCurriculumUpdate = false;
    this.isCurriculumgroupAdd = false;
    this.isCurriculumgroupUpdate = false;
  }



}
