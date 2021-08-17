import { Component, OnInit, TemplateRef, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassReviewService } from 'src/app/admin/core/services/class-review.service';
import { Review } from 'src/app/admin/core/models/class_review';
import { DataTable } from '../../../core/models/datatable';

@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  @ViewChildren('class') classes: QueryList<ElementRef>;

  public class_seq: any;
  reviewType = 0;
  froalaValue: string = "";
  templates = "";

  edit = {};
  reviewTitle = {};

  reviews: DataTable = new DataTable();
  review: Review = new Review();

  public option = {
    imageUploadURL: 'http://localhost:5000/api/froala/upload/review',
    imageUploadMethod: 'POST',
    imageMaxSize: 5 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],

    events: {
      contentChanged: () => {
        try {
          for (let i = 0; i < this.classes['_results'].length; i++) {
            if(this.reviewType == 1) 
              this.templates = this.classes['_results'][i].nativeElement.children[2].children[0].innerHTML;
            for(let i=0; i<this.reviews.data.length; i++) {
              if(this.edit[this.reviews.data[i].class_review_seq] == 1) {
                this.templates = this.classes['_results'][i].nativeElement.children[2].children[0].innerHTML;
                break;
              }
            }
          }
        } catch {

        }
      }
    }
  }
  
  constructor(private classReviewService: ClassReviewService,
              private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.class_seq = val.class_seq;
    });

    this.reviews.pageNumber = 1;
    this.reviews.size = 10;

    this.getReviews();
  }

  ngOnInit() {
  }

  getReviews() {
    this.classReviewService.getClassReviews(this.reviews, this.class_seq).subscribe(data => {
      this.reviews = data;
      console.log(this.reviews);
      for(let i=0; i<data.data.length; i++) {
        this.edit[data.data[i].class_review_seq] = 0;
        this.reviewTitle[data.data[i].class_review_seq] = data.data[i].title;
      }      
    });
  }

  write() {
    this.reviewType = 1;
  }

  writeCancel() {
    this.reviewType = 0;
  }

  writeOK() {
    this.review.class_seq = this.class_seq;
    this.review.parent_seq = 1;
    this.review.content = this.templates;
    this.classReviewService.addReview(this.review).subscribe(data => {
      this.getReviews();
      this.reviewType = 0;
      this.froalaValue = "";
      this.review = new Review();
    });
  }

  editAble(class_review_seq: number) {
    this.edit[class_review_seq] = 1;
  }

  cancle(class_review_seq: number) {
    this.edit[class_review_seq] = 0;
  }

  deleteClassReview(class_review_seq: number) {
    if (confirm("이 글을 정말 지우시겠습니까?") === true) {
      this.classReviewService.deleteReview(class_review_seq).subscribe(data => {
        this.getReviews();
      });
    }
  }

  editClassReview(class_review_seq: number) {
    for(let i=0; i<this.reviews.data.length; i++) {
      if(class_review_seq == this.reviews.data[i].class_review_seq) {
        this.reviews.data[i].title = this.reviewTitle[class_review_seq];
        this.reviews.data[i].content = this.templates;

        this.classReviewService.updateReview(this.reviews.data[i], class_review_seq).subscribe(data => {
          this.getReviews();
          this.froalaValue = "";
        });
        this.cancle(class_review_seq);
      }
    }
  }
  

}
