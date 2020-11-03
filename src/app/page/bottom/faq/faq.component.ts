import { Component, OnInit, SecurityContext } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FaqService } from '../../core/services/faq.service';
import { Faq } from '../../core/models/faq';
import { DataTable } from '../../core/models/datatable';
import { SlideInOutAnimation } from './faq.animations';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  animations: [SlideInOutAnimation]
})
export class FaqComponent implements OnInit {

  faqs = new DataTable();

  nowIndex = -1;
  isActivate = false;

  constructor(private faqService: FaqService,
    private modal: NzModalService,
    private message: NzMessageService) {
    this.faqs.pageNumber = 1;
    this.faqs.size = 10;
    this.getFaqs();
  }

  ngOnInit() { }

  getFaqs() {
    this.faqService.getFaqs(this.faqs).subscribe(data => {
      this.faqs = data;
    });
  }

  dropDown(i) {
    if (this.nowIndex != i) {
      this.isActivate = true;
      this.nowIndex = i;
    }
    else {
      this.isActivate = !this.isActivate;
    }

  }
}
