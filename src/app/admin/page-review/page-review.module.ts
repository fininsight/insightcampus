import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageReviewComponent } from './page-review.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { ClassService } from '../core/services/class.service';
import { ReviewService } from '../core/services/review.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    ClassService,
    ReviewService,
  ],
  declarations: [
    PageReviewComponent
  ]
})
export class PageReviewModule { }