import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFamilyAddfareComponent } from './page-family-addfare.component';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { NgZorroAntdModule, en_US } from 'ng-zorro-antd';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    NzSelectModule,
    NzDatePickerModule,
  ],
  providers: [
    IncamAddfareService,
  ],
  declarations: [PageFamilyAddfareComponent]
})
export class PageFamilyAddfareModule { }
