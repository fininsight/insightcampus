import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [
    {
        path: '', component: MainComponent
    }]
}];

export const PageRoutes = RouterModule.forChild(routes);
