import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public templates = [];

  @ViewChildren('class') classes: QueryList<ElementRef>;

  constructor(private communityService: CommunityService,
              private route: ActivatedRoute,
              private router: Router) { 
    
    route.params.subscribe(val => {
      this.board_seq = val.board_seq;
    });

    this.communityService.getBoard(this.board_seq).subscribe(data => {
      this.board = data;
      if (data.content !== null && data.content !== '') {
        this.templates = JSON.parse(data.content);
      }
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

  boardSave() {
    const boardContent: any = {
      board_seq: this.board_seq,
      content: JSON.stringify(this.templates)
    }

    this.communityService.updateTemplate(boardContent).subscribe(data => {
      console.log(data);
    })
  }

  convertDateType(dateStr) {
    if (dateStr == null) {
      return;
    }

    const dateDate = new Date(dateStr);
    let dateConvert = "";

    dateConvert += (dateDate.getFullYear() + ". ");
    dateConvert += (dateDate.getMonth()+1 + ". ");
    dateConvert += (dateDate.getDate() + " ");
    dateConvert += (dateDate.getHours() + ":");
    dateConvert += dateDate.getMinutes();

    return dateConvert;
  }

  goBoardList() {
    this.router.navigate(['/community']);
  }

  boardDelete() {
    if (confirm("이 글을 정말 지우시겠습니까?") === true) {
       this.communityService.deleteBoard(this.board_seq).subscribe(data => {
         console.log(data);
         this.router.navigate(['/community']);
       });
    }
  }

}
