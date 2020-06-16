import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumService } from '../core/services/curriculum.service';
import { PageCurriculumComponent } from './page-curriculum.component';

describe('PageCurriculumComponent', () => {
  let component: PageCurriculumComponent;
  let fixture: ComponentFixture<PageCurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
