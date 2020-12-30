import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFinWorkComponent } from './page-fin-work.component';

describe('PageFinWorkComponent', () => {
  let component: PageFinWorkComponent;
  let fixture: ComponentFixture<PageFinWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFinWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFinWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
