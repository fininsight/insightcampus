import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class.component';
import { DetailComponent } from './detail/detail.component';
import { DetailQnaComponent } from './detail/detail-qna/detail-qna.component';
import { DetailNoticeComponent } from './detail/detail-notice/detail-notice.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

// Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';
import { importType } from '@angular/compiler/src/output/output_ast';
import { AboutusComponent } from './aboutus/aboutus.component';

@NgModule({
  imports: [
    CKEditorModule,
    CommonModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    DragDropModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzMessageModule,
    NzPaginationModule
  ],
  declarations: [
    ClassComponent,
    DetailComponent,
    DetailQnaComponent,
    DetailNoticeComponent,
    SafeHtmlPipe,
    AboutusComponent,
  ],
  providers: [
  ]
})
export class ClassModule { }
