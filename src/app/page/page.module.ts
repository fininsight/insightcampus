import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassModule } from './class/class.module';
import { CommunityModule } from './community/community.module';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { PageComponent } from './page.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { CommunityComponent } from './community/community.component';

import { TermsComponent } from './bottom/terms/terms.component';
import { PrivacyComponent } from './bottom/privacy/privacy.component';
import { FaqComponent } from './bottom/faq/faq.component';

import { PageRoutes } from './page.routing';
import { ClassService } from './core/services/class.service';
import { RefundComponent } from './bottom/refund/refund.component';


@NgModule({
  imports: [
    CommonModule,
    ClassModule,
    CommunityModule,
    NgZorroAntdModule,
    FormsModule,
    PageRoutes,
  ],
  providers: [
    ClassService
  ],
  declarations: [
    PageComponent,
    MainComponent,
    NavComponent,
    LoginComponent,
    JoinComponent,
    CommunityComponent,
    TermsComponent,
    PrivacyComponent,
    RefundComponent,
    FaqComponent,
  ]
})
export class PageModule { }
