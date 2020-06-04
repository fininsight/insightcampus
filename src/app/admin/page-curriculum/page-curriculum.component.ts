import { Component, OnInit } from '@angular/core';
import { CurriculumService } from '../core/services/curriculum.service';
import { DataTable } from '../core/models/datatable';
import { Curriculum } from '../core/models/curriculum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-page-curriculum',
  templateUrl: './page-curriculum.component.html',
  styleUrls: ['./page-curriculum.component.css']
})
export class PageCurriculumComponent implements OnInit {
  curriculums = new DataTable();
  selectedCurriculum: Curriculum = new Curriculum();
  seqSelectedCurriculum: Curriculum = new Curriculum();
  popupCurriculum: Curriculum = new Curriculum();

  isCurriculumAdd = false;
  isCurriculumUpdate = false;
  curriculumLoading = false;
  
  constructor(
    private curriculumService: CurriculumService,
    private message: NzMessageService,
   
    private modal: NzModalService) {
      this.curriculums.pageNumber = 1;
      this.curriculums.size = 20;

      this.getCurriculums();
    }

  ngOnInit(): void {
  }

  getCurriculums() {
    this.curriculumService.getCurriculums(this.curriculums).subscribe(data => {
      this.curriculums = data;
      this.curriculumLoading = false;
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
    this.curriculumService.addCurriculum(this.popupCurriculum).subscribe(data => {
      this.getCurriculums();
      this.selectedCurriculum = new Curriculum();
      this.isCurriculumAdd = false;
      this.message.create('success', '커리큘럼등록이 완료되었습니다.');
    });
  }

  popupCancel(): void{
    this.isCurriculumAdd = false;
    this.isCurriculumUpdate = false;
  }

  curriculumUpdate() {
    this.popupCurriculum = new Curriculum();
    this.popupCurriculum.curriculum_seq = this.selectedCurriculum.curriculum_seq;
    this.popupCurriculum.curriculum_nm = this.selectedCurriculum.curriculum_nm;
    this.popupCurriculum.class_seq = this.selectedCurriculum.class_seq;
    this.popupCurriculum.duration = this.selectedCurriculum.duration;
    this.popupCurriculum.level = this.selectedCurriculum.level;
    this.popupCurriculum.parent_seq = this.selectedCurriculum.parent_seq;
    this.popupCurriculum.order = this.selectedCurriculum.order;
    this.popupCurriculum.video_url = this.selectedCurriculum.video_url;
    this.popupCurriculum.video_type = this.selectedCurriculum.video_type;
    this.isCurriculumUpdate = true;
  }

  curriculumUpdateOk(): void {
    this.curriculumService.updateCurriculum(this.popupCurriculum).subscribe(data => {
      this.getCurriculums();
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
          this.getCurriculums();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }





}
