import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWpboardNoticeComponent } from './page-wpboard-notice.component';

describe('PageWpboardNoticeComponent', () => {
  let component: PageWpboardNoticeComponent;
  let fixture: ComponentFixture<PageWpboardNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWpboardNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWpboardNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
