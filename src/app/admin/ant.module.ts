import { NgModule } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
    declarations: [],
    imports: [
        NzMenuModule,
        NzIconModule,
        NzTableModule
    ],
    exports: [
        NzMenuModule,
        NzIconModule,
        NzTableModule
    ]
  })
  export class AntModule {}
