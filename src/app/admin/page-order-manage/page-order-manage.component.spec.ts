import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOrderManageComponent } from './page-order-manage.component';

describe('PageOrderManageComponent', () => {
  let component: PageOrderManageComponent;
  let fixture: ComponentFixture<PageOrderManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageOrderManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOrderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
