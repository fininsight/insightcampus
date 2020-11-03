import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PageUserModule } from './page-user/page-user.module';
import { PageCodeModule } from './page-code/page-code.module';
import { PageClassModule } from './page-class/page-class.module';
import { PageClassNoticeModule } from './page-class-notice/page-class-notice.module'
import { PageCurriculumModule } from './page-curriculum/page-curriculum.module';
import { PageReviewModule } from './page-review/page-review.module';
import { AuthService } from './core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { PageIncamAddfareModule } from './page-incam-addfare/page-incam-addfare.module';
import { PageIncamContractModule } from './page-incam-contract/page-incam-contract.module';
import { PageFamilyAddfareModule } from './page-family-addfare/page-family-addfare.module';
import { PageTeacherModule } from './page-teacher/page-teacher.module';
import { PageCouponModule } from './page-coupon/page-coupon.module';
import { PageFaqModule } from './page-faq/page-faq.module';

@NgModule({
  imports: [
    AdminRoutes,
    CommonModule,
    NgZorroAntdModule,
    PageUserModule,
    PageCodeModule,
    PageClassModule,
    PageClassNoticeModule,
    PageCurriculumModule,
    PageReviewModule,
    FormsModule,
    PageIncamAddfareModule,
    PageFamilyAddfareModule,
    PageIncamContractModule,
    PageTeacherModule,
    PageCouponModule, // Coupon Module 포함
    PageFaqModule,      // FAQ Module 포함
  ],
  providers: [
    AuthService
  ],
  declarations: [
    AdminComponent,
    MainComponent,
    NavComponent
  ]
})
export class AdminModule { }
