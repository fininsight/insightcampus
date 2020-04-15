import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit, OnDestroy {

  // public Editor = InlineEditor;
  private type: any;
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
  };

  constructor(route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.type = val.type;
      /*
      InlineEditor.create(document.querySelector('#editor'))
      .then(editor => {
        console.log(editor);
      })
      .catch(error => {
        console.error(error);
      });
      */

    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    console.log('destory');
}

}
