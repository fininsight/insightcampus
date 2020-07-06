import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIncamAddfareComponent } from './page-incam-addfare.component';

describe('PageIncamAddfareComponent', () => {
  let component: PageIncamAddfareComponent;
  let fixture: ComponentFixture<PageIncamAddfareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageIncamAddfareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIncamAddfareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
