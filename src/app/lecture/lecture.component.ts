import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  movePrevLecture() {
    alert('이전강의 이동');
  }

  moveNextLecture() {
    alert('다음강의 이동');
  }  

}
