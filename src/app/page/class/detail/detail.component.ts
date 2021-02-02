import { Component, OnInit, ViewChildren, QueryList, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Class } from '../../core/models/class';
import { ClassService } from '../../core/services/class.service';
import { DataTable } from '../../core/models/datatable';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public class_seq: any;
  public class_data: Class = new Class();
  public admin = false;
  public condition = false;
  public templates = [];
  public tab = 1;
  public all_class = new DataTable();
  public selectLoadClass;

  @ViewChildren('class') classes: QueryList<ElementRef>;

  testTemplage = `
  <div class="template-class-info">
    <div class="title">
      <div class="title-text">
        <div style="font-size:30px">제목을 입력해 주세요</div>
        <div class="title-line"></div>
      </div>
    </div>
    <div style="font-size:14px; color:black;">
      내용을 입력해 주세요
    </div>
  </div>
`;

testTemplage2 = `
  <div class="template-class-title">
    <div class="image">
      <img src="../../../../assets/images/template/template02-02.png"/>
    </div>
    <div class="title" style="font-size: 35px; color: white;">
      제목
    </div>
  </div>
`;

  introduceTemplate = `
    <div class="template-class-introduce">
      <div class="icon-box">
        <div class="icon">
          <img src="../../../../assets/icons/folder-regular.svg" />
        </div>
      </div>
      <div class="title">
        <h1>Introduction</h1>
      </div>
      <div class="content">
        <img src="../../../../assets/icons/quote-left-solid.svg" />
        <p>글자를 입력하세요</p>
        <img src="../../../../assets/icons/quote-right-solid.svg" />
      </div>
    </div>
  `;

  class2Template = `
  <div class="template-class-class2">
    <div class="icon-box">
      <div class="icon">
        <img src="../../../../assets/icons/lightbulb-regular.svg" />
      </div>
    </div>
    <div class="title">
      <h1>Point</h1>
    </div>
    <div class="intro-list">
      <h2>이 강의가 특별한 이유</h2>
      <ol>
        <li>입력하세요</li>
        <li>입력하세요</li>
        <li>입력하세요</li>
      </ol>
    </div>
  </div>
  `;

  tagTemplate = `
  <div class="template-class-tag">
    <div class="tag-box">
      <p>#입력해주세요</p>
    </div>
  </div>
  `;

  curriculumTemplate = `
  <div class="template-class-curriculum">
    <div class="icon-box">
      <div class="icon">
        <img src="../../../../assets/icons/clipboard-regular.svg" />
      </div>
    </div>
    <div class="title">
      <h1>Curriculum</h1>
    </div>
    <div class="class-part">
      <h2>제 1장 | 타이틀</h2>
      <ul>
        <li>입력하세요</li>
        <li>입력하세요</li>
        <li>입력하세요</li>
      </ul>
    </div>
  </div>
  `;

  infoTemplate = `
  <div class="template-class-info">
    <div class="icon-box">
      <div class="icon">
        <img src="../../../../assets/icons/info-solid.svg" />
      </div>
    </div>
    <div class="info-box">
      <div class="title">
        <h2>수강 방법</h2>
      </div>
      <p>입력해주세요</p>
    </div>
  </div>
  `;

  public option =  {
    toolbarInline: true,
    charCounterCount: false,
    toolbarVisibleWithoutSelection: true,
    // Set the image upload parameter.
    // imageUploadParam: 'image_param',
    // Additional upload params.
    // imageUploadParams: {id: 'my_editor'},
    // Set the image upload URL.
    imageUploadURL: 'http://localhost:5000/api/froala/upload/class',
    // Set request type.
    imageUploadMethod: 'POST',
    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,
    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    events : {
      initialized: (editor) => {
        // editor._editor.edit.off();
      },
      'editable.contentChanged': (editor) => {
        console.log('컨텐츠 체인지');
        console.log(editor);
      },
      focus: (editor) => {
        // console.log(editor);
      },
      contentChanged: () => {
        try {
          for (let i = 0; i < this.classes['_results'].length; i++) {
            this.templates[i] = this.classes['_results'][i].nativeElement.children[0].children[0].innerHTML;
          }
        } catch {

        }
      }
    },
    /*
    events: {
      'image.beforeUpload': function (images) {
        // Return false if you want to stop the image upload.
      },
      'image.uploaded': function (response) {
        // Image was uploaded to the server.
      },
      'image.inserted': function ($img, response) {
        // Image was inserted in the editor.
      },
      'image.replaced': function ($img, response) {
        // Image was replaced in the editor.
      },
      'image.error': function (error, response) {
        // Response contains the original server response to the request if available.
      }
    }
    */
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modal: NzModalService,
              private classService: ClassService,
              private message: NzMessageService) {

    route.params.subscribe(val => {
      this.class_seq = val.class_seq;
    });

    this.classService.getClass(this.class_seq).subscribe(data => {
      this.class_data = data;
      if (data.template !== null && data.template !== '') {
        this.templates = JSON.parse(data.template);
      }
    });

    const tempClass: DataTable = new DataTable();
    tempClass.pageNumber = 1;
    tempClass.size = 20;

    this.classService.getClasses(tempClass).subscribe(data => {
      console.log(data);
      this.all_class = data;
    });

    // this.templates.push(this.testTemplage);
  }

  ngOnInit() {
  }

  testAdd() {
    this.templates.push(this.testTemplage);
  }

  testAdd2() {
    this.templates.push(this.testTemplage2);
  }

  introduceAdd() {
    this.templates.push(this.introduceTemplate);
  }

  class2Add() {
    this.templates.push(this.class2Template);
  }

  tagAdd() {
    this.templates.push(this.tagTemplate);
  }

  curriculumAdd() {
    this.templates.push(this.curriculumTemplate);
  }

  infoAdd() {
    this.templates.push(this.infoTemplate);
  }

  testAdmin() {
    this.admin = true;
    console.log(this.classes);
  }

  testAdminDisable() {
    this.admin = false;
  }

  testSave() {

    const saveClass: any = {
      class_seq: this.class_seq,
      template: JSON.stringify(this.templates)
    };
    console.log(saveClass);

    this.classService.updateTemplate(saveClass).subscribe(data => {
      console.log(data);
    });

    console.log(this.templates);

  }

  loadSave() {
    console.log(this.selectLoadClass);
    console.log(this.all_class);
    this.templates = JSON.parse(this.all_class.data[this.selectLoadClass].template);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.templates, event.previousIndex, event.currentIndex);
  }

  changeTab(tab){
    this.tab = tab;
  }

}
