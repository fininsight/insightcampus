import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { MainComponent } from './main/main.component';
import { ClassComponent } from './class/class.component';
import { DetailComponent } from './class/detail/detail.component';

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [
    {
        path: '', component: MainComponent
    },
    {
        path: 'class/:type', component: ClassComponent
    }
    ,
    {
        path: 'detail/:class_seq', component: DetailComponent
    }
  ]
}];

export const PageRoutes = RouterModule.forChild(routes);
