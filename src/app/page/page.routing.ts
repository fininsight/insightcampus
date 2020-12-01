import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { MainComponent } from './main/main.component';
import { ClassComponent } from './class/class.component';
import { DetailComponent } from './class/detail/detail.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { CommunityComponent } from './community/community.component';
import { BoardComponent } from './community/board/board.component';

import { AboutusComponent } from './class/aboutus/aboutus.component';


//bottom
import { TermsComponent } from './bottom/terms/terms.component';
import { PrivacyComponent } from './bottom/privacy/privacy.component';
import { RefundComponent } from './bottom/refund/refund.component';;
import { FaqComponent } from './bottom/faq/faq.component';

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [
    {
        path: '', component: MainComponent
    },
    {
        path: 'class/:type', component: ClassComponent
    },
    {
        path: 'detail/:class_seq', component: DetailComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'join', component: JoinComponent
    },
    {
        path: 'community', component: CommunityComponent
    },
    {
        path: 'board/:board_seq', component: BoardComponent
    },
    {
        path: 'terms', component: TermsComponent
    },
    {
        path: 'privacy', component: PrivacyComponent
    },
    {
        path: 'refund', component: RefundComponent
    },
    {
        path: 'aboutus', component: AboutusComponent
    },
    {
        path: 'faq', component: FaqComponent
    }
  ]
}];

export const PageRoutes = RouterModule.forChild(routes);
