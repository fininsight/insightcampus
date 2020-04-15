import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { MainComponent } from './main/main.component';
import { ClassComponent } from './class/class.component';

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
  ]
}];

export const PageRoutes = RouterModule.forChild(routes);
