import { Component, OnInit, SecurityContext } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CouponService } from '../core/services/coupon.service';
import { Coupon } from '../core/models/coupon';
import { User } from '../core/models/user'
import { DataTable } from '../core/models/datatable';
import { DatePipe } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-coupon',
  templateUrl: './page-coupon.component.html',
  styleUrls: ['./page-coupon.component.css']
})
export class PageCouponComponent implements OnInit {
  users = new DataTable();
  user_id;

  coupons = new DataTable();

  couponLoading = true;
  isCouponAdd = false;
  isCouponUpdate = false;

  selectedCoupon: Coupon = new Coupon();
  popupCoupon: Coupon = new Coupon();

  constructor(private couponService: CouponService,
    private authService: AuthService,
    private userService: UserService,
    private modal: NzModalService,
    private message: NzMessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute) 
    { 
      this.coupons.pageNumber = 1;
      this.coupons.size = 10;
      this.getCoupons();
    }

  ngOnInit() {}


  loggedInfo() {
    var userData = this.couponService.getUserId();
    
    this.userService.getUsers(this.users).subscribe(data => {
      this.users = data;
      data.data.forEach(element => {
        if(userData['nameid'] === element.user_id) { 
          this.user_id = element.user_seq;
        }
     });
    });
  }

  getCoupons() {
    this.couponService.getCoupons(this.coupons).subscribe(data => {
      this.coupons = data;
      this.couponLoading = false;
      this.selectedCoupon = new Coupon();
    });
    this.loggedInfo();
  }

  getCoupon() {
    this.couponService.getCoupon(this.coupons, this.selectedCoupon.coupon_seq).subscribe(data => {
      this.coupons = data;
      this.couponLoading = false;
      this.selectedCoupon = new Coupon();
    });
  }

  selectCoupon(param) {
    this.selectedCoupon = param;
  }

  couponAdd() {
    this.popupCoupon = new Coupon();
    this.popupCoupon.coupon_seq = this.selectedCoupon.coupon_seq;
    this.isCouponAdd = true;
  }

  couponAddOk() : void {
    this.couponService.addCoupon(this.popupCoupon).subscribe(data => {
      this.getCoupons();
      this.selectedCoupon = new Coupon();
      this.isCouponAdd = false;
      this.message.create('success', '등록이 완료되었습니다.');
    });
  }

  couponUpdate() {
    this.popupCoupon = new Coupon();
    this.popupCoupon.coupon_seq = this.selectedCoupon.coupon_seq;
    this.popupCoupon.coupon_nm = this.selectedCoupon.coupon_nm;
    this.popupCoupon.type = this.selectedCoupon.type;
    this.popupCoupon.start_date = this.selectedCoupon.start_date;
    this.popupCoupon.end_date = this.selectedCoupon.end_date;
    this.popupCoupon.upd_dt = this.selectedCoupon.upd_dt;
    this.popupCoupon.upd_user = this.selectedCoupon.upd_user;
    this.popupCoupon.use_yn = this.selectedCoupon.use_yn;
    this.isCouponUpdate = true;
  }

  couponUpdateOk() : void {
    this.couponService.updateCoupon(this.popupCoupon).subscribe(data => {
      this.getCoupons();
      this.isCouponUpdate = false;
      this.message.create('sucess', '수정이 완료되었습니다.');
    });
  }

  popupCancel(): void{
    this.isCouponAdd = false;
    this.isCouponUpdate = false;
  }

  couponDelete() {
    this.modal.confirm({
      nzTitle: '삭제하시겠습니까?',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.couponService.deleteCoupon(this.selectedCoupon.coupon_seq).subscribe(data => {
          this.getCoupons();
          this.message.create('success', '삭제가 완료되었습니다.');
        });
      }
    });
  }
}
