import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCurriculumComponent } from './page-curriculum.component';
import { CurriculumService } from '../core/services/curriculum.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { ClassService } from '../core/services/class.service';
 

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    ClassService,
    CurriculumService,
  ],
  
  declarations: [
    PageCurriculumComponent
  ]
})
export class PageCurriculumModule { }
