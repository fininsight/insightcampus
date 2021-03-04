import { Component, OnInit } from '@angular/core';
import { ClassService } from '../core/services/class.service';
import { DataTable } from '../core/models/datatable';
import { Class } from '../core/models/class'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-page-class',
  templateUrl: './page-class.component.html',
  styleUrls: ['./page-class.component.css']
})
export class PageClassComponent implements OnInit {

  classes = new DataTable();

  selectedClass: Class = new Class();

  popupClass: Class = new Class();

  isClassAdd = false;
  isClassUpdate = false;
  
  classLoading = true;

  sortValue: string | null = null;
  sortKey: string | null = null;

  filter = {
    class_nm: '',
    teacher: '',
    duration_nm: ''
  };

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    // this.searchData();
  }

  constructor(private userService: ClassService,
              private modal: NzModalService,
              private message: NzMessageService) {
                this.classes.pageNumber = 1;
                this.classes.size = 10;

                this.getClassesFilter();
  }

  ngOnInit(): void {
  }

  getClassesFilter() {
    this.userService.getClassesFilter(this.classes, this.filter).subscribe(data => {
      console.log(data);
      data.data = data.data.map(v => {
        v.check = false;
        return v;
      });

      this.classes = data;
      this.classLoading = false;
      this.selectedClass = new Class();
    });
  }


  getClass() {
    this.userService.getClasses(this.classes).subscribe(data => {
      this.classes = data;
      this.classLoading = false;
      this.selectedClass = new Class();
    });
  }

  selectClass(param) {
    this.selectedClass = param;
  }
  
  classAdd() {
    this.popupClass = new Class();
    this.isClassAdd= true;
  }
  
  classAddOk() : void {
    this.userService.addClass(this.popupClass).subscribe(data => {
      this.getClass();
      this.isClassAdd = false;
      this.message.create('success', '사용자 추가가 완료되었습니다.');
    })
  }
  
  classUpdate() {
    this.popupClass = new Class();
    this.popupClass.class_seq = this.selectedClass.class_seq;
    this.popupClass.class_nm = this.selectedClass.class_nm;
    this.popupClass.category = this.selectedClass.category;
    this.popupClass.teacher = this.selectedClass.teacher;
    this.popupClass.duration = this.selectedClass.duration;
    this.popupClass.duration_nm = this.selectedClass.duration_nm;
    this.popupClass.thumbnail = this.selectedClass.thumbnail;
    this.popupClass.online_yn = this.selectedClass.online_yn;
    this.popupClass.price = this.selectedClass.price;
    this.popupClass.real_price = this.selectedClass.real_price;
    this.popupClass.template = this.selectedClass.template;
    this.isClassUpdate = true;
  }
  
  classUpdateOk() : void {
    this.userService.updateClass(this.popupClass, this.popupClass.class_seq).subscribe(data => {
      this.getClass();
      this.isClassUpdate = false;
      this.message.create('success', '사용자 수정이 완료되었습니다.');
    })
  }
  
  classDelete() {
    this.modal.confirm({
      nzTitle: '사용자를 삭제하시겠습니까?',
      nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.userService.deleteClass(this.selectedClass.class_seq).subscribe(data => {
          this.getClass();
          this.message.create('success', '사용자 삭제가 완료되었습니다.');
        })
      }
    });
  }
  
  popupCancel() : void {
    this.isClassAdd = false;
    this.isClassUpdate = false;
  }
}
