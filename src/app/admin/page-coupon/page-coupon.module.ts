import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PageCouponComponent } from './page-coupon.component';
import { CouponService } from '../core/services/coupon.service';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageCouponComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
  ],
  providers: [
    CouponService,
    DatePipe,
    AuthService,
    UserService,
  ],
})
export class PageCouponModule { }
