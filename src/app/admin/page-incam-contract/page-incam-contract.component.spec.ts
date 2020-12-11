import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIncamContractComponent } from './page-incam-contract.component';

describe('PageIncamContractComponent', () => {
  let component: PageIncamContractComponent;
  let fixture: ComponentFixture<PageIncamContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageIncamContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIncamContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
