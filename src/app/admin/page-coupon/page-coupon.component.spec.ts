import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCouponComponent } from './page-coupon.component';

describe('PageCouponComponent', () => {
  let component: PageCouponComponent;
  let fixture: ComponentFixture<PageCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
