import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../../core/services/community.service';
import { Community } from '../../core/models/community';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public board_seq: any;
  public board: Community = new Community();
  public admin = false;
  public templates = ["<div>hello</div>", "<div>good</div>"];

  @ViewChildren('class') classes: QueryList<ElementRef>;

  constructor(private communityService: CommunityService,
              private route: ActivatedRoute) { 
    
    route.params.subscribe(val => {
      this.board_seq = val.board_seq;
    });

    this.communityService.getBoard(this.board_seq).subscribe(data => {
      this.board = data;
    })
  }

  public option =  {
    toolbarInline: true,
    charCounterCount: false,
    toolbarVisibleWithoutSelection: true,

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
  };

  ngOnInit() { }

  adminAble() {
    this.admin = true;
  }

  adminDisable() {
    this.admin = false;
  }

  test() {
    console.log(this.templates);
  }

}
