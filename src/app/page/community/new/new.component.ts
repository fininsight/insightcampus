import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Community } from '../../core/models/community';
import { CommunityService } from '../../core/services/community.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @ViewChildren('class') classes: QueryList<ElementRef>;

  community: Community = new Community();

  title: string = "";
  author: string = "";
  password: string = "";
  category: string = "";

  froalaValue: string = "";
  templates = [];

  public options = {
    placeholderText: "내용을 입력하세요",
    imageUploadURL: 'http://localhost:5000/api/froala/upload/community',
    imageUploadMethod: 'POST',
    imageMaxSize: 5 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],

    events: {
      contentChanged: () => {
        try {
          for (let i = 0; i < this.classes['_results'].length; i++) {
            this.templates[i] = this.classes['_results'][i].nativeElement.children[2].children[0].innerHTML;
          }
        } catch {

        }
      }
    }
  }


  constructor(private communityService: CommunityService,
              private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if (!this.title) {
      alert("제목을 입력하세요");
      return;
    } else if (!this.author) {
      alert("작성자를 입력하세요");
      return;
    } else if (!this.password) {
      alert("비밀번호를 입력하세요");
      return;
    } else if (!this.category) {
      alert("카테고리를 선택하세요");
      return;
    } else if (!this.froalaValue) {
      alert("내용을 입력하세요");
      return;
    }

    this.community.title = this.title;
    this.community.content = JSON.stringify(this.templates);
    this.community.category = this.category;
    this.communityService.writeBoard(this.community).subscribe(data => {
      console.log(data);
    })

    alert("글 작성이 완료되었습니다.");
    this.router.navigate(['/community']);
  }

  goBackPage() {
    if (confirm("작성 중인 글이 지워질 수 있습니다\n정말 뒤로 가시겠습니까?") === true) {
      this.router.navigate(['/community']);
    }
  }
}
