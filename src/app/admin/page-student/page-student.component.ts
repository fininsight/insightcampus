import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Class } from '../core/models/class';
import { DataTable } from '../core/models/datatable';
import { Student } from '../core/models/student';
import { Code } from '../core/models/code';
import { environment } from 'src/environments/environment';
import { ClassService } from '../core/services/class.service';
import { StudentService } from '../core/services/student.service';
import { CodeService } from '../core/services/code.service';

@Component({
  selector: 'app-page-student',
  templateUrl: './page-student.component.html',
  styleUrls: ['./page-student.component.css']
})
export class PageStudentComponent implements OnInit {

  baseUrl = environment.apiUrl;

  classes = new DataTable();
  students = new DataTable();

  selectedClass: Class = new Class();
  popupClass: Class = new Class();
  selectedStudent: Student = new Student();

  orderCode: Array<Code> = [];

  isSendMail = false;
  isClassUpdate = false;

  classLoading = true;
  studentLoading = false;

  allCheck = false;
  checks: any;

  mailSendLoading = false;
  mailSendLoadingText = '메일전송중';

  confirmModal?: NzModalRef;

  constructor(private userService: ClassService,
              private studentService: StudentService, 
              private codeService: CodeService,
              private message: NzMessageService,
              private modal: NzModalService,
              ) {
                this.classes.pageNumber = 1;
                this.classes.size = 10;
                this.students.pageNumber = 1;
                this.students.size = 10;
                this.getClass();
                this.getCodes();
  }

  ngOnInit() {
  }

  getClass() {
    this.classLoading = true;
    this.userService.getClasses(this.classes).subscribe(data => {
      this.classes = data;
      this.classLoading = false;
      this.selectedClass = new Class();
      console.log(data);
    });
  }

  getStudent() {
    this.studentLoading = true;
    this.studentService.getStudent(this.selectedClass.class_seq, this.students).subscribe(data => {
      this.students = data
      this.studentLoading = false;
    });
  }

  surveyUrlUpdate() {
    this.popupClass = new Class();
    this.popupClass = JSON.parse(JSON.stringify(this.selectedClass));
    this.isClassUpdate = true;
  }

  surveyUrlUpdateOk() {
    this.userService.updateClass(this.popupClass, this.popupClass.class_seq).subscribe(data => {
      this.getClass();
      this.isClassUpdate = false;
      this.message.create('sucess', '설문조사 url 수정이 완료되었습니다.');
    });
  }

  getCodes() {
    this.codeService.getCodes('order_type').subscribe(data => {
      this.orderCode = data;
    })
  }

  selectClass(param) {
    this.selectedClass = param;
    this.selectedStudent = new Student();
    this.getStudent();
  }

  selectStudent(param) {
    this.selectedStudent = param;
  }

  studentPdf() {
    const pdfLink = this.baseUrl + 'pdf/certification/';
    this.confirmModal = this.modal.confirm({
      nzTitle: '수료증 PDF 다운로드',
      nzContent: '선택하신 내용을 PDF로 다운로드하시겠습니까?',
      nzOnOk: () => {
        location.assign(pdfLink + this.selectedClass.class_seq + '/' + this.selectedStudent.order_user_seq);
      },
      nzOnCancel: () => {
        this.confirmModal.destroy();
      }
    });
  }

  // studentEmail() {
  //   this.confirmModal = this.modal.confirm({
  //     nzTitle: '수료증 PDF 메일 전송',
  //     nzContent: '선택하신 내용의 PDF를 전송하시겠습니까?',
  //     nzOnOk: () => new Promise((resolve, reject) => {
  //       this.studentService.sendCertification(this.selectedClass.class_seq, this.selectedStudent.order_user_seq).subscribe(data => {
  //         resolve(data);
  //         this.message.create('success', '전송이 완료되었습니다.');
  //       })
  //     }).catch(() => { this.message.create('error', '전송에 실패했습니다.'); }),
  //     nzOnCancel: () => {
  //       this.confirmModal.destroy();
  //     }
  //   });
  // }

  allCheckChange() {
    this.students.data = this.students.data.map(v => {
      v.check = this.allCheck;
      return v;
    });
  }

  sendStudentEmail() {
    this.checks = this.students.data.filter(v => (v.check));
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
      console.log(basket[0].order_user_seq);
      await this.studentService.sendCertification(this.selectedClass.class_seq, basket[0].order_user_seq);
      this.mailSendLoadingText = `메일전송중 (총 : ${all} / 전송완료 : ${all - checksCopy.length})`;

    }

    this.message.create('success', '전송이 완료되었습니다.');
    this.mailSendLoading = false;
    this.isSendMail = false;
  }

  popupCancel() {
    this.isSendMail = false;
    this.isClassUpdate = false;
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

  getCodeName(codeId: string) {
    const findCode = this.orderCode.find(code => code.code_id === codeId);
    return findCode.code_nm;
  }

}
