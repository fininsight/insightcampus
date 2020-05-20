import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCodeComponent } from './page-code.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CodegroupService } from '../core/services/codegroup.service';
import { CodeService } from '../core/services/code.service';
import { FormsModule } from '@angular/forms';
import { CurriculumService } from '../core/services/curriculum.service';



@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    CodegroupService,
    CodeService, 
    CurriculumService,
  ],
  declarations: [
    PageCodeComponent
  ]
})
export class PageCodeModule { }
