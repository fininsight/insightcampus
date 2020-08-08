import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { NgZorroAntdModule, en_US } from 'ng-zorro-antd';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { PageIncamContractComponent } from './page-incam-contract.component';

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
  declarations: [PageIncamContractComponent]
})
export class PageIncamContractModule { }
