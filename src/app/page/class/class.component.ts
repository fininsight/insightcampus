import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { ClassService } from '../core/services/class.service';
import { DataTable } from '../core/models/datatable';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit, OnDestroy {

  // public Editor = InlineEditor;
  public type: any;
  classes = new DataTable();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private classService: ClassService) {

    this.classes.pageNumber = 1;
    this.classes.size = 20;

    route.params.subscribe(val => {
      this.type = val.type;
    });

    this.classService.getClasses(this.classes).subscribe(data => {
      this.classes = data;
    });

  }

  ngOnInit() {

  }

  gotoPage(class_seq) {
    console.log(class_seq);
    this.router.navigate(['/detail/' + class_seq]);
  }

  ngOnDestroy(): void {
    console.log('destory');
}

}
