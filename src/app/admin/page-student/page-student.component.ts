import { Component, OnInit } from '@angular/core';
import { Class } from '../core/models/class';
import { DataTable } from '../core/models/datatable';
import { ClassService } from '../core/services/class.service';

@Component({
  selector: 'app-page-student',
  templateUrl: './page-student.component.html',
  styleUrls: ['./page-student.component.css']
})
export class PageStudentComponent implements OnInit {

  classes = new DataTable();

  selectedClass: Class = new Class();

  classLoading = true;

  constructor(private userService: ClassService
              ) {
                this.classes.pageNumber = 1;
                this.classes.size = 10;
                this.getClass();
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

  selectClass(param) {
    this.selectedClass = param;
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

}
