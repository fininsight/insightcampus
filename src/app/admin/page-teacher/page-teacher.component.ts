import { Component, OnInit, SecurityContext } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TeacherService } from '../core/services/teacher.service';
import { Teacher } from '../core/models/teacher';
import { User } from '../core/models/user'
import { DataTable } from '../core/models/datatable';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-teacher',
  templateUrl: './page-teacher.component.html',
  styleUrls: ['./page-teacher.component.css']
})
export class PageTeacherComponent implements OnInit {
  phoneNumber = "";
  teachers = new DataTable();
  users = new DataTable();
  selectedTeacher: Teacher = new Teacher();
  popupTeacher: Teacher = new Teacher();

  isTeacherAdd = false;
  isTeacherUpdate = false;

  teacherLoading = true;

  getCurrentUserId = "";
  confirmModal?: NzModalRef;

  user_id; 

  filter = {
    name: ''
  };

  constructor(private teacherService: TeacherService,
    private authService: AuthService,
    private userService: UserService,
    private modal: NzModalService,
    private message: NzMessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute) 
    { 
      this.teachers.pageNumber = 1;
      this.teachers.size = 30;
      this.getTeachers();
 
    }

  ngOnInit() {
   
  }

  loggedInfo() {
    var userData = this.teacherService.getUserId();
    // console.log("Data : " + typeof(userData['nameid']));

    this.userService.getUsers(this.users, {
      name: '',
      email: ''
    }).subscribe(data => {
      this.users = data;
      data.data.forEach(element => { //get all user id in user table
        // console.log("Element : " + element.user_id);
        // console.log("Name : " + userData['nameid']);
        if(userData['nameid'] === element.user_id) { 
          this.user_id = element.user_seq;
          // console.log("Here ! ", element.user_id);
          // console.log("Here ! ID : " + this.user_id);
        }
     });
    });


  }

  getTeachers() {
    this.teacherService.getTeachers(this.teachers, this.filter).subscribe(data => {
      console.log(data);

      data.data = data.data.map(v => {
        v.check = false;
        return v;
      });

      this.teachers = data;
      this.teacherLoading = false;
      this.selectedTeacher = new Teacher();
    });
  }

  getTeacher() {
    this.teacherService.getTeacher(this.teachers, this.selectedTeacher.teacher_seq).subscribe(data => {
      this.teachers = data;
      this.teacherLoading = false;
      this.selectedTeacher = new Teacher();
    });
  }

  selectTeacher(param) {
    this.selectedTeacher = param;
  }

  teacherAdd() {
    this.popupTeacher = new Teacher();
    this.popupTeacher.teacher_seq = this.selectedTeacher.teacher_seq;
    this.isTeacherAdd = true;
  }

  teacherAddOk() : void {
    var now = new Date(); //get current Date
    this.popupTeacher.ret_dt = now;
    this.popupTeacher.upd_dt = now;
    this.popupTeacher.reg_user = this.user_id;
    this.popupTeacher.upd_user = this.user_id;
    this.popupTeacher.use_yn = 1;
    this.teacherService.addTeacher(this.popupTeacher).subscribe(data => {
      this.getTeachers();
      this.selectedTeacher = new Teacher();
      this.isTeacherAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
  }

  teacherUpdate() {
    this.popupTeacher = new Teacher();
    this.popupTeacher.teacher_seq = this.selectedTeacher.teacher_seq;
    this.popupTeacher.name = this.selectedTeacher.name;
    this.popupTeacher.email = this.selectedTeacher.email;
    this.popupTeacher.phone = this.selectedTeacher.phone;
    this.popupTeacher.address = this.selectedTeacher.address;
    this.popupTeacher.user_seq = this.selectedTeacher.user_seq;
    this.popupTeacher.passwd = this.selectedTeacher.passwd;
    // this.popupTeacher.reg_user = this.user_id;
    this.popupTeacher.ret_dt = this.selectedTeacher.ret_dt;
    this.popupTeacher.upd_dt = this.selectedTeacher.upd_dt;
    this.isTeacherUpdate = true;
  }

  teacherUpdateOk() : void {
    var now = new Date();
    this.popupTeacher.upd_dt = now;
    this.popupTeacher.upd_user = this.user_id;
    console.log("id: " + this.popupTeacher.upd_user);
    this.teacherService.updateTeacher(this.popupTeacher).subscribe(data => {
      this.getTeachers();
      this.isTeacherUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
  }

  popupCancel(): void{
    this.isTeacherAdd = false;
    this.isTeacherUpdate = false;
  }

  teacherDelete() {
    this.modal.confirm({
      nzTitle: '삭제하시겠습니까?',
      // nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.teacherService.deleteTeacher(this.selectedTeacher.teacher_seq).subscribe(data => {
          this.getTeachers();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }

  teacherExcel(){
    this.confirmModal = this.modal.confirm({
      nzTitle: '강사관리 엑셀 다운로드',
      nzContent: '강사관리를 엑셀로 다운로드하시겠습니까?',
      nzOnOk: () => {
        this.teacherService.getTeacherExcel(this.filter);
      },
      nzOnCancel: () => {
        this.confirmModal.destroy();
      }
    });
  }

  


}
