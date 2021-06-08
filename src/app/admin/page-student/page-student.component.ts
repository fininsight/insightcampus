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
  selectedStudent: Student = new Student();

  orderCode: Array<Code> = [];

  isSendMail = false;

  classLoading = true;
  studentLoading = false;
  mailSendLoading = false;

  mailSendLoadingText = '메일전송중';

  checks: any;

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
    });
  }

  getStudent() {
    this.studentLoading = true;
    this.studentService.getStudent(this.selectedClass.class_seq, this.students).subscribe(data => {
      this.students = data
      this.studentLoading = false;
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

  studentEmail() {
    this.confirmModal = this.modal.confirm({
      nzTitle: '수료증 PDF 메일 전송',
      nzContent: '선택하신 내용의 PDF를 전송하시겠습니까?',
      nzOnOk: () => new Promise((resolve, reject) => {
        this.studentService.sendCertification(this.selectedClass.class_seq, this.selectedStudent.order_user_seq).subscribe(data => {
          resolve(data);
          this.message.create('success', '전송이 완료되었습니다.');
        })
      }).catch(() => { this.message.create('error', '전송에 실패했습니다.'); }),
      nzOnCancel: () => {
        this.confirmModal.destroy();
      }
    });
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
