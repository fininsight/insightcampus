import { Component, OnInit, ViewChildren, QueryList, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Class } from '../../core/models/class';
import { ClassService } from '../../core/services/class.service';
import { DataTable } from '../../core/models/datatable';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CurriculumgroupService } from 'src/app/admin/core/services/curriculumgroup.service';
import { CurriculumService } from 'src/app/admin/core/services/curriculum.service';
declare const IMP: any;

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
  public curriculum = new DataTable();
  public curriculumgroup = new DataTable();
  public curriculum_list = {};
  public selectLoadClass;
  public thumbnail: File = null;
  public tabSize = 10;
  public isCollapsedTab = [true, false, false, false, false];

  @ViewChildren('class') classes: QueryList<ElementRef>;

  testTemplage = `
  <div class="template-class-info">
    <div class="title">
      <div class="title-text">
        <div style="font-size:30px">제목을 입력해 주세요</div>
        <div class="title-line"></div>
      </div>
    </div>
    <div class="title-content" style="font-size:14px; color:black;">
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

  goalTemplate = `
  <div class="template-class-goal">
    <div class="icon-box">
      <div class="icon">
        <img src="../../../../assets/icons/check-double-solid.svg" />
      </div>
    </div>
    <div class="content-box">
      <div class="title">
        <p>Goal</p>
      </div>
      <div class="goal-list">
        <ul>
          <li>입력해주세요</li>
          <li>입력해주세요</li>
          <li>입력해주세요</li>
          <li>입력해주세요</li>
        </ul>
      </div>
    </div>
  </div>
  `;

  professorTemplate = `
  <div class="template-class-professor">
    <div class="title">
      <h1>Professor</h1>
    </div>
    <div class="professor-info">
      <h2>이정훈</h2>
      <p>이정훈 교수님은 의료 데이터 딥러닝 분야의 전문가입니다. 풍부한 연구 경험과 데이터 북석 강의 경력을 가지고 있습니다.</p>
    </div>
    <div class="career">
      <p>[학력]</p>
      <br />
      <br />
      <p>서울대학교 자연과학대학 생물정보학(Bioinformatics)협동과정</p>
      <p>서울대학교 의과대학 Biomedical informatics(SNUBI)박사과정</p>
      <p>인하대학교 컴퓨터정보공학 학사</p>
    </div>
  </div>
  `;

  foryouTemplate = `
  <div class="template-class-foryou">
    <div class="icon-box">
      <div class="icon">
        <img src="../../../../assets/icons/hand-point-down-regular.svg" />
      </div>
    </div>
    <div class="title">
      <h1>For You</h1>
    </div>
    <div class="recommend">
      <p>이런 분들께 추천드립니다!</p>
      <div class="recommend-box-wrapper">
        <div class="recommend-box">
          <h3>IT 엔지니어</h3>
          <p>실무에 딥러닝 분석을</p>
          <p>적용하고 싶은 IT 실무자</p>
        </div>
        <div class="recommend-box">
          <h3>데이터 분석가</h3>
          <p>데이터 분석에 딥러닝을</p>
          <p>적용해 보고 싶은 연구원, 대학원생</p>
        </div>
      </div>
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
              private curriculumService: CurriculumService,
              private curriculumgroupService: CurriculumgroupService,
              private message: NzMessageService) {

    route.params.subscribe(val => {
      this.class_seq = val.class_seq;
    });

    this.classService.getClass(this.class_seq).subscribe(data => {
      this.class_data = data;
      if (data.template !== null && data.template !== '') {
        this.templates = JSON.parse(data.template);
      }
      console.log(this.class_data);
    });

    const tempClass: DataTable = new DataTable();
    tempClass.pageNumber = 1;
    tempClass.size = 20;

    this.classService.getClasses(tempClass).subscribe(data => {
      this.all_class = data;
    });
    IMP.init('imp24709734');

    this.curriculum.pageNumber = 1;
    this.curriculum.size = 10;
    this.curriculumgroup.pageNumber = 1;
    this.curriculumgroup.size = 10;
    this.getCurriculums();
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

  goalAdd() {
    this.templates.push(this.goalTemplate);
  }

  professorAdd() {
    this.templates.push(this.professorTemplate);
  }

  foryouAdd() {
    this.templates.push(this.foryouTemplate);
  }

  deleteTemplte() {
    this.templates.pop();
  }

  thumbnailUpload(files) {
    this.thumbnail = files.item(0);
    alert("파일 업로드가 되었습니다\n꼭 저장하여 썸네일을 등록해주세요");
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
    console.log("!!!" + saveClass);

    this.classService.updateTemplate(saveClass).subscribe(data => {
      console.log(data);
    });

    this.classService.updateThumbnail(this.class_seq ,this.thumbnail).subscribe(data => {
      console.log(data);
    })

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
    for(let i=0; i<this.isCollapsedTab.length; i++) 
      this.isCollapsedTab[i] = false;
    this.isCollapsedTab[tab-1] = true;
  
  }

  getCurriculums() {
    this.curriculumgroupService.getCurriculumgroup(this.curriculumgroup, this.class_seq).subscribe(data => {
      this.curriculumgroup = data;
      for(let i=0; i<this.curriculumgroup.data.length; i++) {
        this.curriculumService.getCurriculum(this.curriculum, this.curriculumgroup.data[i].curriculumgroup_seq).subscribe(curriculum_data => {
          this.curriculum = curriculum_data;
          console.log(this.curriculum.data);
          let curriculum_nmList = [];
          for(let j=0; j<this.curriculum.data.length; j++) {
            curriculum_nmList.push(this.curriculum.data[j].curriculum_nm);
          }
          this.curriculum_list[this.curriculumgroup.data[i].curriculumgroup_nm] = curriculum_nmList;
        }); 
      }
      console.log("!!" + this.curriculum_list);
    });

    
   }

  buyClass(pay_method) {
    IMP.request_pay({
      pg : 'html5_inicis',
      pay_method,
      merchant_uid : 'class_' + new Date().getTime(),
      name : this.class_data.class_nm,
      amount : this.class_data.real_price,
      // buyer_email : 'buyer@test.com',
      // buyer_name : '구매자이름',
      // buyer_tel : '010-1234-5678',
      // buyer_addr : '서울특별시 강남구 삼성동',
      // buyer_postcode : '123-456',
      company: 'fininsight',
      m_redirect_url : `/detail/${this.class_data.class_seq}`
    }, res => {
      let msg: string = '';

      if (res.success) {
        msg = '결제가 완료되었습니다.';
        msg += '고유ID : ' + res.imp_uid;
        msg += '상점 거래ID : ' + res.merchant_uid;
        msg += '결제 금액 : ' + res.paid_amount;
        msg += '카드 승인번호 : ' + res.apply_num;
      } else {
        msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + res.error_msg;
      }
      alert(msg);
    })
  }
}
