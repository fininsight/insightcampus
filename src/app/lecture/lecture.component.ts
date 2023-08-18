import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurriculumService } from '../admin/core/services/curriculum.service';
import { CurriculumgroupService } from '../admin/core/services/curriculumgroup.service';
import { Class } from '../page/core/models/class';
import { DataTable } from '../page/core/models/datatable';
import { ClassService } from '../page/core/services/class.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  public class_seq: number;
  public curriculum = new DataTable();
  public curriculumgroup = new DataTable();
  public class_data: Class = new Class();
  public curriculum_list = {};

  constructor(private route: ActivatedRoute,
            private classService: ClassService,
            private curriculumService: CurriculumService,
            private curriculumgroupService: CurriculumgroupService) { 
    route.firstChild.params.subscribe(val => {
      this.class_seq = val.class_seq;
    });

    this.curriculum.pageNumber = 1;
    this.curriculum.size = 10;
    this.curriculumgroup.pageNumber = 1;
    this.curriculumgroup.size = 10;

    this.classService.getClass(this.class_seq).subscribe(data => {
      this.class_data = data;
    });

    this.getCurriculums();
    
  }

  ngOnInit() {
  }

  movePrevLecture() {
    alert('이전강의 이동');
  }

  moveNextLecture() {
    alert('다음강의 이동');
  }  

  getCurriculums() {
    this.curriculumgroupService.getCurriculumgroup(this.curriculumgroup, this.class_seq).subscribe(data => {
      this.curriculumgroup = data;
      for(let i=0; i<this.curriculumgroup.data.length; i++) {
        this.curriculumService.getCurriculum(this.curriculum, this.curriculumgroup.data[i].curriculumgroup_seq).subscribe(curriculum_data => {
          this.curriculum = curriculum_data;
          let curriculum_nmList = {};
          for(let j=0; j<this.curriculum.data.length; j++) {
            curriculum_nmList[this.curriculum.data[j].curriculum_nm] = this.curriculum.data[j].duration;
          }
          this.curriculum_list[this.curriculumgroup.data[i].curriculumgroup_nm] = curriculum_nmList;
        }); 
      }
    });
  }

}
