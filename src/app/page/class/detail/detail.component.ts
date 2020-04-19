import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from '../../core/services/class.service';
import { Class } from '../../core/models/class';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public class_seq: any;
  public admin = false;
  public condition = false;
  public templates = [];
  @ViewChildren('class') classes: QueryList<ElementRef>;

  public option =  {
    toolbarInline: true,
    charCounterCount: false,
    toolbarVisibleWithoutSelection: true,
     // Set the image upload parameter.
     imageUploadParam: 'image_param',
     // Set the image upload URL.
     imageUploadURL: '/upload_image',
     // Additional upload params.
     imageUploadParams: {id: 'my_editor'},
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

  testTemplage = `
    <div class="class-info">
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private classService: ClassService) {

    route.params.subscribe(val => {
      this.class_seq = val.class_seq;
    });

    this.classService.getClass(this.class_seq).subscribe(data => {
      if (data.template !== null && data.template !== '') {
        this.templates = JSON.parse(data.template);
      }
    });

    // this.templates.push(this.testTemplage);
  }

  ngOnInit() {
  }

  testAdd() {
    console.log('test');
    this.templates.push(this.testTemplage);
  }

  testAdmin() {
    this.admin = true;
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.templates, event.previousIndex, event.currentIndex);
  }

}
