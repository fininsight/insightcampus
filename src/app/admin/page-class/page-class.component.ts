import { Component, OnInit } from '@angular/core';
import { ClassService } from '../core/services/class.service';
import { CodeService } from '../core/services/code.service';
import { TeacherService } from '../core/services/teacher.service';
import { DataTable } from '../core/models/datatable';
import { Class } from '../core/models/class'
import { Code } from '../core/models/code';
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

  thumbnailFile: File = null;
  thumbnailLoading: boolean = false;

  isClassAdd = false;
  isClassUpdate = false;
  
  classLoading = true;
  date = null;
  classCode: Array<Code> = [];

  listOfTeacher: Array<{ value: number; text: string }> = [];

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
              private codeService: CodeService,
              private teacherService: TeacherService,
              private modal: NzModalService,
              private message: NzMessageService) {
                this.classes.pageNumber = 1;
                this.classes.size = 10;

                this.getClassesFilter();
                this.getCodes();
                this.searchTeacher('ALL');
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

  getCodes() {
    this.codeService.getCodes('class_status').subscribe(data => {
      this.classCode = data;
    })
  }

  selectClass(param) {
    this.selectedClass = param;
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
  
  classAdd() {
    this.popupClass = new Class();
    this.isClassAdd= true;
    this.date = null;
  }
  
  classAddOk() : void {
    this.userService.addClass(this.popupClass).subscribe(data => {
      this.getClass();
      this.isClassAdd = false;
      this.message.create('success', '강의 추가가 완료되었습니다.');
    })
  }
  
  classUpdate() {
    this.popupClass = new Class();
    this.popupClass.class_seq = this.selectedClass.class_seq;
    this.popupClass.class_nm = this.selectedClass.class_nm;
    this.popupClass.category = this.selectedClass.category;
    this.popupClass.teacher = this.selectedClass.teacher;
    this.popupClass.start_date = this.selectedClass.start_date;
    this.popupClass.end_date = this.selectedClass.end_date;
    this.popupClass.duration_nm = this.selectedClass.duration_nm;
    this.popupClass.thumbnail = this.selectedClass.thumbnail;
    this.popupClass.online_yn = this.selectedClass.online_yn;
    this.popupClass.price = this.selectedClass.price;
    this.popupClass.real_price = this.selectedClass.real_price;
    this.popupClass.template = this.selectedClass.template;
    this.popupClass.zoom_link = this.selectedClass.zoom_link;
    this.popupClass.zoom_pw = this.selectedClass.zoom_pw;
    this.popupClass.view_yn = this.selectedClass.view_yn;
    this.popupClass.status = this.selectedClass.status;
    this.isClassUpdate = true;
    this.date = [new Date(this.popupClass.start_date), new Date(this.popupClass.end_date)]
  }
  
  classUpdateOk() : void {
    this.userService.updateClass(this.popupClass, this.popupClass.class_seq).subscribe(data => {
      this.getClass();
      this.isClassUpdate = false;
      this.message.create('success', '강의 수정이 완료되었습니다.');
    })

  }
  
  classDelete() {
    this.modal.confirm({
      nzTitle: '강의를 삭제하시겠습니까?',
      nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.userService.deleteClass(this.selectedClass.class_seq).subscribe(data => {
          this.getClass();
          this.message.create('success', '강의 삭제가 완료되었습니다.');
        })
      }
    });
  }
  
  popupCancel() : void {
    this.isClassAdd = false;
    this.isClassUpdate = false;
  }

  onDateChange(event) {
    this.popupClass.start_date = event[0]
    this.popupClass.end_date = event[1]
  }

  getFullDate(target: string) {
    const date = new Date(target);
    let year: string | number = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();

    const result = [year, month, day].join('-');
    return result;
  }
  
  thumbnailUpload(files) {
    this.thumbnailLoading = true;
    this.thumbnailFile = files.item(0);
    this.userService.updateThumbnail(this.thumbnailFile).subscribe(data => {
      this.popupClass.thumbnail = data.toString();
      this.thumbnailLoading = false;
    })
  }
}
