import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageIncamAddfareComponent } from './page-incam-addfare.component';
import { IncamAddfareService } from '../core/services/incam-addfare.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
 
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    IncamAddfareService,
  ],

  declarations: [PageIncamAddfareComponent],
  
})
export class PageIncamAddfareModule { }
