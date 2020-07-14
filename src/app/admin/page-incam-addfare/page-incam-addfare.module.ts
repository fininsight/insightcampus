import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageIncamAddfareComponent } from './page-incam-addfare.component';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { NgZorroAntdModule, en_US } from 'ng-zorro-antd';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common'; 
import zh from '@angular/common/locales/zh'; 
registerLocaleData(zh);
 
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

  declarations: [PageIncamAddfareComponent],
  
})
export class PageIncamAddfareModule { }
