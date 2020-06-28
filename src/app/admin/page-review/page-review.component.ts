import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../core/services/review.service';
import { ClassService } from '../core/services/class.service';
import { DataTable } from '../core/models/datatable';
import { Review } from '../core/models/class_review';
import { Class } from '../core/models/class';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-page-review',
  templateUrl: './page-review.component.html',
  styleUrls: ['./page-review.component.css']
})
export class PageReviewComponent implements OnInit {
  classReviews = new DataTable();
  classes = new DataTable();

  selectedClassReview: Review = new Review();
  selectedClass: Class = new Class();

  seqSelectedClassReview: Review = new Review();
  seqSelectedClass: Class = new Class();

  popupClassReview: Review = new Review();

  classReviewLoading = false;
  classLoading = false;

  isClassReviewClick = false;


  constructor(
    private classReviewService: ReviewService,
    private classService: ClassService,
    private message: NzMessageService,
    private modal: NzModalService) 
    { 
      this.classReviews.pageNumber = 1;
      this.classReviews.size = 20;
      this.classes.pageNumber = 1;
      this.classes.size = 20;
      
      this.getClass();
    }

  ngOnInit() : void {
  }


  getClass() {
    this.classService.getClasses(this.classes).subscribe(data => {
      this.classes = data;
      this.classLoading = false;
      this.selectedClass = new Class();
      this.classReviews = new DataTable();
    });
  }

  selectClass(param) {
    this.selectedClass = param;
    this.classLoading = true;
    this.getClassReview();
  }

  selectClassReview(param) {
    this.selectedClassReview = param;
  }

  getClassReview() {
    this.classReviewService.getClassReview(this.classReviews, this.selectedClass.class_seq).subscribe(data => {
      this.classReviews = data;
      this.classReviewLoading = false;
      this.classLoading = false;
      this.selectedClassReview = new Review();
    });
  }

  popupSuccess() {
    this.popupClassReview = new Review();
    this.popupClassReview.content = this.selectedClassReview.content;
    this.isClassReviewClick = true;
  }

  popupCancel() {
    this.isClassReviewClick = false;
  }

}
